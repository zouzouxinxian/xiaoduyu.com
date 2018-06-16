import Ajax from '../common/ajax'
// import Promise from 'promise'


import grapgQLClient from '../common/grapgql-client'
import graphql from './common/graphql'

function setUser(userinfo) {
  return { type: 'SET_USER', userinfo }
}

export function removeAccessToken() {
  return { type: 'REMOVE_ACCESS_TOKEN' }
}

export const loadUserInfo = ({ accessToken = null }) => {
  return (dispatch, getState) => {

    return new Promise(async (resolve, reject) => {

      accessToken = accessToken || getState().user.accessToken
      // (randomString:"${new Date().getTime()+accessToken}")
      /*
      let sql = `
      {
        selfInfo{
          _id
          nickname_reset_at
          create_at
          last_sign_at
          blocked
          role
          avatar
          brief
          source
          posts_count
          comment_count
          fans_count
          like_count
          follow_people_count
          follow_topic_count
          follow_posts_count
          block_people_count
          block_posts_count
          block_comment_count
          gender
          nickname
          banned_to_post
          avatar_url
          email
          weibo
          qq
          github
          phone
          find_notification_at
          last_find_posts_at
        }
      }
      `;
      */

      let [ err, res ] = await graphql({
        api: 'selfInfo',
        args: {},
        fields: `
        _id
        nickname_reset_at
        create_at
        last_sign_at
        blocked
        role
        avatar
        brief
        source
        posts_count
        comment_count
        fans_count
        like_count
        follow_people_count
        follow_topic_count
        follow_posts_count
        block_people_count
        block_posts_count
        block_comment_count
        gender
        nickname
        banned_to_post
        avatar_url
        email
        weibo
        qq
        github
        phone
        area_code
        find_notification_at
        last_find_posts_at
        `,
        headers: { accessToken }
      });
      
      if (err) {
        resolve([err])
      } else {
        dispatch({ type: 'SET_USER', userinfo: res })
        resolve([null, res])
      }

    })


  }
}

/**
 * 更新用户
 * @param  {Object} args 更新内容，具体更新内容请查看想要的api
 * @return {Array}      err 错误， res 结果
 */
export function updateUser(args) {
  return async (dispatch, getState) => {
    return new Promise(async resolve => {

      args._id = getState().user.profile._id;

      let [ err, res ] = await graphql({
        type: 'mutation',
        api: 'updateUser',
        args,
        fields: `
          success
        `,
        headers: { accessToken: getState().user.accessToken }
      });

      resolve([ err, res ]);

    })
  }
}

/**
 * 更新密码
 * @param  {Object} args 更新内容，具体更新内容请查看想要的api
 * @return {Array}      err 错误， res 结果
 */
export function updatePassword(args) {
  return async (dispatch, getState) => {
    return new Promise(async resolve => {

      args.user_id = getState().user.profile._id;

      let [ err, res ] = await graphql({
        type: 'mutation',
        api: 'updatePassword',
        args,
        fields: `
          success
        `,
        headers: { accessToken: getState().user.accessToken }
      });

      resolve([ err, res ]);

    })
  }
}

/*
export const loadUserInfo = ({ accessToken = null }) => {
  return (dispatch, getState) => {

    accessToken = accessToken || getState().user.accessToken


    return new Promise((resolve, reject) => {

      return Ajax({
        url: '/user',
        type: 'post',
        headers: { AccessToken: accessToken }
      }).then(res => {
        if (res && res.success) {
          dispatch({ type: 'SET_USER', userinfo: res.data })
        }
        resolve(res)
      }).catch(reject)

    })

  }
}


export function resetAvatar({ avatar, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().user.accessToken

    return Ajax({
      url: '/reset-avatar',
      type: 'post',
      data: { avatar: avatar },
      headers: { AccessToken: accessToken },
      callback
    })

  }
}

export function resetNickname({ nickname, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().user.accessToken

    return Ajax({
      url: '/reset-nickname',
      type: 'post',
      data: { nickname: nickname },
      headers: { AccessToken: accessToken },
      callback
    })

  }
}

export function resetGender({ gender, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().user.accessToken

    return Ajax({
      url: '/reset-gender',
      type: 'post',
      data: { gender: gender },
      headers: { AccessToken: accessToken },
      callback
    })

  }
}

export function resetBrief({ brief, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().user.accessToken

    return Ajax({
      url: '/reset-brief',
      type: 'post',
      data: { brief: brief },
      headers: { AccessToken: accessToken },
      callback
    })

  }
}

*/
