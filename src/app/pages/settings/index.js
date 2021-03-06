import React from 'react';

// components
import Shell from '@modules/shell';
import Meta from '@modules/meta';

// modules
import Avatar from '@modules/settings/avatar';
import Brief from '@modules/settings/brief';
import Email from '@modules/settings/email';
import Gender from '@modules/settings/gender';
import Nickname from '@modules/settings/nickname';
import Oauth from '@modules/settings/oauth';
import Password from '@modules/settings/password';
import Phone from '@modules/settings/phone';
import Block from '@modules/settings/block';

// layout
import SingleColumns from '../../layout/single-columns';

@Shell
export default class SettingsPage extends React.PureComponent {

  render() {
    return (<SingleColumns>      
      <Meta title='设置' />        
      <Avatar />
      <Nickname />
      <Brief />
      <Gender />
      <Password />
      <Phone />
      <Email />
      <Oauth />
      <Block />
    </SingleColumns>)
  }
  
}