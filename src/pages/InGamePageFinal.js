import React, { useEffect, useState } from 'react'
import UserBox from '../components/box/UserBox'
import axios from 'axios'
import RoomCodeButton from '../components/button/RoomCodeButton';
import "./InGamePageFinal.scss";

const InGamePageFinal = ({roomCode}) => {
    const [userText, setUserText] = useState(""); // 유저 채팅
    const [isLoading, setIsLoading] = useState("false");
    const [userList, setUserList] = useState([]);
    const [chatArray, setChatArray] = useState([]); // 유저 채팅 배열
    const [presentState, setPresentState] = useState("123");
    const [liarMap, setLiarMap] = useState({});
    const [role, setRole] = useState("");
    const [goalWord, setGoalWord] = useState("56448455413216844");
    const [ready, setReady] = useState(false);
    const [flag, setFlag] = useState(false);
    const [num, setNum] = useState(1);
    const [userName, setUserName] = useState("");

    
    // 쿠키에서 특정 키의 값을 가져오는 함수
    const getCookieValue = (key) => {
        const cookiePairs = document.cookie.split("; ");
        for (let i = 0; i < cookiePairs.length; i++) {
            const pair = cookiePairs[i].split("=");
            if (pair[0] === key) {
                return pair[1];
            }
        }
            return null;
    };
    // 사용자가 채팅 치면 작동하는 핸들러
    const enterUserText = (event) => {
        const decodedUrl = decodeURIComponent(getCookieValue("userId"));
        if (event.key === 'Enter' && userName === decodedUrl) 
        {
            const userId = getCookieValue("userId"); // userId 쿠키 값 가져오기
            const userContext = event.target.value;
            axios.post("http://localhost:8181/addGameChat", {userId, userContext});
            axios.get("http://localhost:8181/increaseNum");  
            axios.get("http://localhost:8181/addGameState");                    
            // 입력 창 초기화
            setUserText("");
        }
    };
    //서버에서 채팅 내용을 가져오는 함수
    useEffect(() => {
        const getChat = () => {
            try {
                axios.post("http://localhost:8181/getGameChatList")
                    .then(res=>{
                        setChatArray(res.data);
                    });
            } catch (error) {
                console.error("채팅 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        getChat(); // 최초 렌더링 시 한 번 실행
        const intervalId = setInterval(getChat, 1000);
        // 컴포넌트가 언마운트될 때 clearInterval을 통해 인터벌 정리
        return () => {
            clearInterval(intervalId);
            console.log("클린업");
        };
    }, []);    
    useEffect(()=>{
        const getGameInfo = () =>{
            axios.post("http://localhost:8181/get-user-list", {roomCode})
                .then(res=>{
                    console.log("들어온 사용자: " + res.data);
                    setUserList(res.data);
                    setIsLoading(true);
                });
        }
        getGameInfo();
    }, [])
    // 라이어 정보 가져오기
    useEffect(()=>{
        const a = async() => {
            const res = await axios.post("http://localhost:8181/getLiar");
            const liarData = res.data;
            setLiarMap(liarData);
            };
        a();
    }, []);
    // 라이어 정보 가져와서 화면에 라이어, 시민 띄우기
    useEffect(()=>{
        const decodedUrl = decodeURIComponent(getCookieValue("userId"));
        setRole(`당신은 ${liarMap[decodedUrl]} 입니다`);
    }, [liarMap]);
    // 시민이면 주제어 띄우고 아니면 안띄우기
    useEffect(()=>{
        console.log("실행하나요??");
        const decodedUrl = decodeURIComponent(getCookieValue("userId"));
        if(liarMap[decodedUrl] === "시민"){
            const goalWord1 = "주제어는 김치 입니다";
            setGoalWord(goalWord1);
            setReady(true);
        }else{
            const goalWord1 = "";
            setGoalWord(goalWord1);
            }
            setReady(true);
    }, [role]);
    // 현재 누구 차례인지 그 차례의 사람 이름 가져오기
    useEffect(()=>{
        if(ready){
            // 이제 게임을 시작합니다 
            axios.post("http://localhost:8181/getPrsentState", {num})
                .then((res)=>{
                    setPresentState(res.data);
                    setNum(prevNumber=>prevNumber+1);
                });
            setTimeout(() => {
                setFlag(true);
            }, 3000);
        }
    }, [ready]);
    useEffect(()=>{
        if(flag){
            axios.post("http://localhost:8181/getPrsentState", {num})
                .then((res)=>{
                    setPresentState(res.data);
                });
        }
    }, [flag]);
    useEffect(()=>{
        if(flag){            
            axios.post("http://localhost:8181/getPrsentState", {num})
                .then((res)=>{
                    setPresentState(res.data);
                });
        }
    }, [num]);
    useEffect(()=>{
        if(flag){
            axios.post("http://localhost:8181/getGameState")
                .then((res)=>{
                    console.log(res.data);
                    setNum(res.data+1);
                });
        }
    }, [userName]);
    const increase = () => {
        axios.get("http://localhost:8181/increaseNum");  
        axios.get("http://localhost:8181/addGameState");
    }


    // 현재 차례의 이름 가져오기
    useEffect(()=>{
        const getPresentUser = ()=>{
            //console.log("실행중");
            axios.post("http://localhost:8181/getPresentUser", {roomCode})
                .then(res=>{
                        //console.log("가져온 이름: " + res.data);
                        setUserName(res.data);
                });  
            };
        setInterval(getPresentUser, 1000);
    }, []);

  return (
    <div className='ingame-wrapper'>
        {/* 왼쪽 화면 */}
        <div className='user-box-left-part'>
            <UserBox userName={userList[0]} show={true} increase={increase} className="ingame-first-user-box"/>
            <UserBox userName={userList[1]} show={true} increase={increase} className="ingame-second-user-box"/>
            <UserBox userName={userList[2]} show={true} increase={increase} className="ingame-third-user-box"/>
            <UserBox userName={userList[3]} show={true} increase={increase} className="ingame-forth-user-box"/>
        </div>
        {/* 중앙 화면 */}
        <div className='chat-part'>
        <div className='role'>{role}</div>
        <div className='word'>{goalWord}</div>
          {/* 게임 상황 */}
          {isLoading?
            (<span className='__present-state'>{presentState}</span>)
            :
            (<span>...Loading</span>)
            }
            <div className='__chat-box'>
                <div className='__chatiing-box'>
                {/* 채팅 내용을 매핑하여 출력 */}
                {chatArray.map((chat, index) => (
                    <div key={index} className='__chat-item'>
                        <span className='__chat-user'>{chat.userName}:</span>
                        <span className='__chat-text'>{chat.userContext}</span>
                    </div>
                    ))
                }
                </div>
                <input
                    className='__chat-input'
                    value={userText}
                    onChange={(event) => setUserText(event.target.value)}
                    onKeyDown={enterUserText}
                />
            </div>
        </div>
    </div>
  )
}

export default InGamePageFinal