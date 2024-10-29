// 웹페이지 스크롤 관련 class 정의
const messageWrap = document.querySelector('.top-wrap');

// 메세지 화면
const messageList = document.querySelector('.message-list');
// 메세지 입력창
const messageInput = document.querySelector(".bottom-message-input-textarea")
// 메세지 보내기 저장
const messageSendButton = document.querySelector(".bottom-message-send-button")

// 로딩
const loading = document.querySelector(".loading")

// 마지막으로 전송된 메세지의 시간 저장
let lastTimeString = '';


// ------------------------------------------------------------------------------------------------------------------------------

// 시간 함수
var timeFun = () => {
  // 시간
  let today = new Date()

  let options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12시간제
  };

  // 시간 포맷팅
  let timeString = new Intl.DateTimeFormat('ko-KR', options).format(today);

  // 'AM'/'PM'을 '오전'/'오후'로 변환
  timeString = timeString.replace('AM', '오전').replace('PM', '오후');

  return timeString;
}


// 클라이언트 메세지 함수
var clientTextFun = (timeString, clientMessageText) => {
  let clientText =``;

  clientText += `
  <div class="middle-message-wrap">
  `;

  // 마지막 메세지 전송 시간에 따라 구현이 달라집니다.
  if (timeString !== lastTimeString) {
    clientText += `
      <!-- 시간(시, 분 겹칠 경우 비활성화) -->
      <div class="middle-message-time">${timeString}</div>
      <!-- 공백 -->
      <div class="middle-message-line"></div>
    `;
  } else {
    clientText += `
      <div class="middle-message-line"></div>
    `;
  }

  clientText += `
    <!-- client 메세지 상자-->
    <div class="client-message-container">
      <div class="client-message-box">
        <div class="client-message-section">
          <!-- client 메세지 -->
          <div class="client-message-all-warp">
            <div class="client-message-all-container">
              <!-- 공백 -->
              <div class="client-message-left-margin">
                <!-- 메세지 삭제 버튼 (포커스 시 활성화) -->
                <button class="client-message-delete-button hidden" type="button">
                  <svg class="client-message-delete-button-img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" foundation="[object Object]" data-testid="bezier-react-icon" margintop="0" marginright="0" marginbottom="0" marginleft="0" aria-hidden="true">
                    <path fill="currentColor" fill-rule="evenodd" d="M9.75 4.75A2.257 2.257 0 0 0 12 7a2.257 2.257 0 0 0 2.25-2.25A2.257 2.257 0 0 0 12 2.5a2.257 2.257 0 0 0-2.25 2.25m2.25 9.5A2.257 2.257 0 0 1 9.75 12 2.257 2.257 0 0 1 12 9.75 2.257 2.257 0 0 1 14.25 12 2.257 2.257 0 0 1 12 14.25m0 7.25a2.257 2.257 0 0 1-2.25-2.25A2.257 2.257 0 0 1 12 17a2.257 2.257 0 0 1 2.25 2.25A2.257 2.257 0 0 1 12 21.5" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <!-- 내용 -->
              <div class="client-message-content-wrap">
                <div class="client-message-content-container">
                  <div class="client-message-content-box">
                    <div id="client-message-text">${clientMessageText}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return clientText;
}


// 서버 메세지 함수
var serverTextFun = (timeString, serverMessageText) => {
  let serverText =``;
  serverText += `
  <div class="middle-message-wrap">
  `;

  // 마지막 메세지 전송 시간에 따라 구현이 달라집니다.
  if (timeString !== lastTimeString ) {
    serverText += `
      <!-- 시간(시, 분 겹칠 경우 비활성화) -->
      <div class="middle-message-time">${timeString}</div>
      <!-- 공백 -->
      <div class="middle-message-line"></div>
    `;
  } else {
    serverText += `
      <div class="middle-message-line"></div>
    `;
  }

  serverText += `
    <!-- potatalk 메세지 상자 (server) -->
    <div class="server-message-container">
      <div class="server-message-box">
        <div class="server-message-section">
          <!-- 이름 -->
          <div class="server-message-name-box">
            <div class="server-message-name">PotaTalk</div>
          </div>
          <!-- server 메세지 -->
          <div class="server-message-all-wrap">
            <div clss="server-messageall-container">
              <div class="server-message-all-section">
                <!-- 아이콘 -->
                <div class="server-message-icon-section">
                  <div class="server-message-icon-wrap">
                    <div class="server-message-icon-box">
                      <img class="server-message-icon-img" width="30" height="30" src="https://cf.channel.io/thumb/200x200/pub-file/28129/63e35c5b4c0474bf7034/tmp-3602965324.webp" alt="">
                    </div>
                  </div>
                </div>
                <!-- 내용 -->
                <div class="server-message-content-wrap">
                  <div class="server-message-content-container">
                    <div class="server-message-text-wrap">
                      <div>
                        <div class="server-message-text-container">
                          <div id="server-message">${serverMessageText}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="server-message-right-margin"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return serverText;
}



// 로딩 함수
var setTimeon = () => {
  loading.classList.remove('hidden')
  messageInput.classList.add('disable')
  // 로딩 시 텍스트 입력 불가하도록 블러
  messageInput.blur();

  // 스크롤 하단으로 내리기
  messageWrap.scrollTop = messageWrap.scrollHeight;
}


// 로딩 완료 후 서버 메세지 전송 함수
var setTimeoff = (serverTextString) => {
  setTimeout(() => {
    loading.classList.add('hidden');
    messageInput.classList.remove('disable')

    // 서버 메세지 전송
    messageList.innerHTML += serverTextString;

    // 로딩 완료 후 텍스트 입력할 수 있도록 포커스
    messageInput.focus();

    // 스크롤 하단으로 내리기
    messageWrap.scrollTop = messageWrap.scrollHeight;
  }, 2000);
}




// 메세지 전송 함수
var sendMessageFun = async (clientMessageText) => {
  // 입력창 초기화
  messageInput.value = '';

  // 메세지 전송 시간 설정
  let timeString = timeFun();

  // 클라이언트 텍스트 정의
  let clientTextString = clientTextFun(timeString, clientMessageText);

  // 메세지 전송 시간 저장
  lastTimeString = timeString

  // 서버 텍스트 추가 정의(불필요)
  // let serverTextString = serverTextFun(timeString);
  let data;

  // 클라이언트 메세지 전송
  messageList.innerHTML += clientTextString;
  // 여기 부분에 서버로 전송하는 await fetch 쿼리가 작성 되어야 함
  const response = await fetch(messageConnectUrl, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'X-CSRFToken': csrf_token,
    },
    body: JSON.stringify({
      'clientMessage': clientMessageText
      // 불필요
      // 'serverMessage': serverMessageText
    })
  });
  const responseText = await response.text();  // JSON이 아닌 응답을 텍스트로 받아서 확인
  console.log('서버 응답 텍스트:', responseText);  // 서버가 반환하는 텍스트 출력

  try {
      data = JSON.parse(responseText);  // JSON으로 변환 시도
      console.log('서버 응답 JSON:', data);
  } catch (error) {
      console.error('JSON 파싱 에러:', error);  // JSON 파싱에 실패할 경우 오류 출력
  }

  // 서버 응답에서 chatbot_response 가져오기
  console.log('data,chatbot', data)
  console.log('data,chatbot2', data['chatbot-response']);
  let serverMessageText = data['chatbot-response']
  console.log(serverMessageText)

  // 서버 텍스트 추가 정의
  let serverTextString = serverTextFun(timeString, serverMessageText);

  // 로딩
  setTimeon()
  // 로딩 종료 후 서버 메세지 전송
  setTimeoff(serverTextString)
}

// 화면 첫 로드 시 안내 메세지 시간 작성 함수
var firstMessageFun = () => {
  // 안내 메세지 시간
  const serverFirstMessage = document.querySelector(".server-first-message")

  // 메세지 시작 시간 설정
  let timestring = timeFun();

  // 메세지 전송 시간 저장
  lastTimeString = timestring

  // 메세지 시작 시간 표시
  serverFirstMessage.innerHTML += timestring;

}

// // 화면 첫 로드 시 안내 메세지 시간
firstMessageFun();

// --------------------------------------------------------------------------------------------------------------------------------------------------
// enter - 메세지 입력
messageInput.addEventListener('keyup', (e) => {
  if (messageInput.value.trim()) {
    // 메세지 버튼 활성화
    messageSendButton.classList.add("send-button-change")
    messageSendButton.classList.remove("disable")

    // 클라이언트 메세지 내용
    let clientMessageText = messageInput.value.trim();

    // 서버 메세지 내용(임시)
    // let serverMessageText = 'test';



    // enter 시 메세지 전송
    if (e.keyCode === 13) {
      // 입력창 enter 입력 막기
      e.preventDefault();
      // 메세지 전송
      // sendMessageFun(clientMessageText, serverMessageText)
      sendMessageFun(clientMessageText)
    }
  }

  // 메세지 미입력 시 전송 버튼 비활성화
  if (!messageInput.value) {
    messageSendButton.classList.remove("send-button-change")
    messageSendButton.classList.add("disable")
    return
  }
})


// 버튼 전송 - 메세지 입력
messageSendButton.addEventListener('click', () => {
  if (messageInput.value.trim()) {
    // 메세지 버튼 활성화
    messageSendButton.classList.add("send-button-change")
    messageSendButton.classList.remove("disable")

    // 클라이언트 메세지 내용
    let clientMessageText = messageInput.value.trim();

    // 서버 메세지 내용(임시)
    // let serverMessageText = 'test';


    // 메세지 전송
    // sendMessageFun(clientMessageText, serverMessageText)
    sendMessageFun(clientMessageText)
  }

  // 메세지 미입력 시 전송 버튼 비활성화
  if (!messageInput.value) {
    messageSendButton.classList.remove("send-button-change")
    messageSendButton.classList.add("disable")
    return
  }
})