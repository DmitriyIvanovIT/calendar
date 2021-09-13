import React, { FC } from 'react';
import { Layout, Menu, Row } from "antd";
import {useTypedSelector} from "hooks/useTypedSelector";
import {useActions} from "hooks/useActions";
import {useHistory} from "react-router-dom";
import {RouteNames} from "router";


const Navbar: FC = (): JSX.Element => {
  const { isAuth, user } = useTypedSelector(state => state.auth);
  const { logout } = useActions();
  const router = useHistory();

  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuth
          ?
          <>
            <div style={{color: 'white'}}>{user.username}</div>
            <Menu theme='dark' mode="horizontal" selectable={false}>
              <Menu.Item onClick={logout} key={1}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
          :
          <Menu theme='dark' mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>
              Логин
            </Menu.Item>
          </Menu>
        }
      </Row>
    </Layout.Header>
  );
};

export default Navbar;