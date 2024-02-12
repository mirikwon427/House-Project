import { ConfigProvider } from 'antd';

export default function AntdProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000',
        },
        components: {
          Pagination: {
            itemSize: 36,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
