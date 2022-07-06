import React from 'react';
import styles from './index.module.scss';

const EmptyBlock: React.FC = (props: {emppty_txt: string}) => {
  const { emppty_txt = '数据为空' } = props;
  return (
    <div className={styles['table-empty-block']}>
      <div className={styles['result-image']}>
        <img alt="data empty" src="https://img.alicdn.com/tfs/TB1_yJXFkL0gK0jSZFAXXcA9pXa-1112-758.png" />
      </div>
      <div className={styles['result_title']}>
        {emppty_txt}
      </div>
    </div>
  );
};

export default EmptyBlock;
