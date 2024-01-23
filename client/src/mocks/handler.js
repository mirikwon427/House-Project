import { http, HttpResponse } from "msw";

const user_data = [['asdf', 'zxcv']]

export const handlers = [
  http.post('api/user_inform', ({request}) => {
    const url = new URL(request.url)
    // 쿼리로 전달된 prams 풀이
    const user_id = url.searchParams.get('user_id')
    const user_pw = url.searchParams.get('user_pw')
    
    if(user_id !== user_data[0][0]) {
      return HttpResponse.json({
        msg: 'There is no matching Id',
        success: false
      })
    } else {
      if (user_pw === user_data[0][1]) {
        return HttpResponse.json({
          userId: user_data[0][0],
          userPw: user_data[0][1],
          token: 'string_token',
          success: true
        })
      } else {
          return HttpResponse.json({
            userId: user_data[0][0],
            msg: 'login Failed, wrong password',
            success: false
          })
      }
    }
  }),
  http.get('api/hello', () => {
    return HttpResponse.json({
        title: 'hello world'
    })
  })
  // 서버의 요청 custom
];