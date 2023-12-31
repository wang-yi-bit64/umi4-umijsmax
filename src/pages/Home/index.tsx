import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const Home: React.FC = () => {

  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {name}
      </div>
    </PageContainer>
  );
};

export default Home;
