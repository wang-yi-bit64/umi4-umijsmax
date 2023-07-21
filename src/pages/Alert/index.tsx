import { map, forEach } from 'ramda';
import { useState, useRef } from 'react';
import {
  Form,
  Checkbox,
  Row,
  Col,
  Card,
  InputNumber,
  Space,
  Button,
} from 'antd';
import {
  guid,
  ALERTCONFIGMAP,
  findIntersection,
  getDifferentElements,
} from '@/utils/common';
import testData from "./utils/testData"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import {Conversation, flattenConversation} from "./utils/type"

function Index() {
  const [form] = Form.useForm();
  const [accessRuleList, setAccessRuleList] = useState<flattenConversation[]>([]);
  const topTierClientsListMap = useRef(new Map<number, Conversation>());

  const onloadData = () => {
    forEach<Conversation>((item) => {
      if (item.type <= 17) {
        if (topTierClientsListMap.current.has(item.type)) {
          const cur = topTierClientsListMap.current.get(item.type);
          const curIndex = accessRuleList.findIndex(
            k => k.type === cur?.type,
          );
          const curTypeList = testData.data.filter(k => k.type === item.type)
          if (curIndex > -1) {
            const curChil = [...curTypeList].map((k, i) => ({
              key: guid(),
              ...k,
              disabled: false,
              index: i,
            }));
            const limitationList = [...curChil]
              .filter(k => k.index === 0 || k.index === 1)
              .map(k => k.id);
            const checkboxValList = [...curChil]
              .filter(k => !k.deleteFlag)
              .map(k => k.id);
            const nextList = curChil.map(k => {
              if (
                limitationList.includes(k.id) &&
                !checkboxValList.includes(k.id)
              ) {
                return {
                  ...k,
                  disabled: true,
                  key: guid(),
                };
              } else {
                return {
                  ...k,
                  key: guid(),
                };
              }
            });
            accessRuleList[curIndex] = {
              type: item.type,
              key: guid(),
              limitation: limitationList,
              radio: [...curChil]
                .filter(k => !k.deleteFlag)
                .map(k => `idDeleteFlagRadio-${k.id}-${k.index}`),
              children: nextList,
            };
            setAccessRuleList([...accessRuleList]);
          }
        } else {
          topTierClientsListMap.current.set(item.type, item);
          accessRuleList.push(item);
          setAccessRuleList([...accessRuleList]);
        }
      }
    }, testData.data);
  };

  const validate = (_: any, value: any) => {
    if (value) {
      const curList = [...value].map(k => k.split('-'));
      console.log('curList', curList);
      if (curList.filter(k => k[2] === '0' || k[2] === '1').length >= 2) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(
          '头部客户画像客户准入配置规则下 第一和第二配置不能同时选择',
        );
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  };

  const radioChange = (e: CheckboxValueType[], item: flattenConversation) => {
    console.log('radioChange start');
    const curCheckboxGroupVal = form.getFieldValue(
      `idDeleteFlagRadio-${item.type}`,
    );
    const curList = curCheckboxGroupVal.map((k: string) => k.split('-'));
    const curIdList = curList.map((k: string[]) => parseInt(k[1], 10));
    const curChildrenIdList  = item?.children?.map(k => k.id);
    const curIndex = accessRuleList.findIndex(k => k.type === item.type);
    // interSectionRes 为 checkboxGroup 中已经选中的checkbox 的集合 与 当前item的children的交集
    const interSectionRes = findIntersection(curIdList, curChildrenIdList ?? []);
    // interLimitation 为 checkboxGroup 中已经选中的checkbox 的集合 与 当前item的limitation的交集
    const interLimitation = findIntersection(curIdList, item.limitation ?? []);
    // otherLimitList 为 item.children 与 item.limitation 的差集, 用于获取可以 多选的部分
    const otherLimitList = getDifferentElements(
      curChildrenIdList ?? [],
      item.limitation ?? [],
    );
    if (interSectionRes.length) {
      if (interLimitation.length) {
        const curChil = item.children?.map(k => {
          if (interSectionRes.includes(k.id)) {
            return {
              ...k,
              deleteFlag: 0,
              disabled: false,
              changeStatus: true,
            };
          } else if (otherLimitList.includes(k.id)) {
            return {
              ...k,
              deleteFlag: 0,
              disabled: false,
              changeStatus: true,
            };
          } else {
            return {
              ...k,
              deleteFlag: 1,
              disabled: true,
              changeStatus: false,
            };
          }
        });
        setAccessRuleList(s =>
          s.map((k, i) => {
            if (i === curIndex) {
              return {
                ...k,
                children: curChil,
              };
            }
            return k;
          }),
        );
      } else {
        const curChil = item.children?.map(k => {
          if (interSectionRes.includes(k.id)) {
            return {
              ...k,
              deleteFlag: 0,
              disabled: false,
              changeStatus: false,
            };
          } else if (item.limitation?.includes(k.id)) {
            return {
              ...k,
              deleteFlag: 1,
              disabled: false,
              changeStatus: false,
            };
          } else {
            return {
              ...k,
              deleteFlag: 1,
              disabled: true,
              changeStatus: false,
            };
          }
        });
        setAccessRuleList(s =>
          s.map((k, i) => {
            if (i === curIndex) {
              return {
                ...k,
                children: curChil,
              };
            }
            return k;
          }),
        );
      }
    } else {
      const curIndex = accessRuleList.findIndex(k => k.type === item.type);
      const curChil = item.children?.map(k => {
        return {
          ...k,
          deleteFlag: 1,
          disabled: false,
        };
      });
      setAccessRuleList(s =>
        s.map((k, i) => {
          if (i === curIndex) {
            return {
              ...k,
              children: curChil,
            };
          }
          return k;
        }),
      );
    }
    console.log('radioChange end');
  };
  return (
    <div className="container lg mx-auto">
      <Button onClick={onloadData}>加载数据</Button>
      <Form
        form={form}
        colon={false}
        onValuesChange={(changedValues, allValues) => {
          console.log('changedValues', changedValues);
          console.log('allValues', allValues);
        }}
      >
        <Row>
          <Col span={12}>
            <Card title="test1">
              {map(
                item => (
                  <Card key={item.key}>
                    <Form.Item
                      label={ALERTCONFIGMAP.get(item.type)}
                      name={`idDeleteFlagRadio-${item.type}`}
                      initialValue={item.radio}
                      rules={[{ validator: validate }]}
                    >
                      <Checkbox.Group onChange={e => radioChange(e, item)}>
                        <Space direction="vertical">
                          {item.children?.map((chil, i) => (
                            <Checkbox
                              key={chil.key}
                              value={`idDeleteFlagRadio-${chil.id}-${i}`}
                              disabled={chil.disabled}
                            >
                              <Form.Item
                                initialValue={chil.value}
                                label={`${chil.purpose} >=`}
                                name={`idTypeInput-${chil.type}-${chil.id}`}
                              >
                                <InputNumber
                                  disabled={!!chil.deleteFlag}
                                  precision={0}
                                  style={{ width: '200px' }}
                                  addonAfter="元"
                                  min={0}
                                />
                              </Form.Item>
                            </Checkbox>
                          ))}
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </Card>
                ),
                accessRuleList,
              )}
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Index;
