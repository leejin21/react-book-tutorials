import { createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// 액션 타입 정의
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수 정의
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });

const increase = (difference) => ({ type: INCREASE, difference });

const decrease = () => ({ type: DECREASE });

// 초깃값 설정
const initialState = {
    toggle: false,
    counter: 0,
};

// 리듀서 함수 정의
function reducer(state = initialState, action) {
    // state가 undefined일 때: initialState를 기본으로 사용
    // action.type에 따라 작업 처리
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                // 불변성 유지해 줘야 함.
                toggle: !state.toggle,
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference,
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1,
            };
        default:
            return state;
    }
}

// 스토어 만들기
const store = createStore(reducer);

// render 함수 만들기
const render = () => {
    // 상태가 업데이트될 때마다 호출됨. 이미 html을 사용해 만들어진 UI의 속성을 상태에 따라 변경해 줌.
    const state = store.getState();
    // 현재 상태를 불러옴
    if (state.toggle) {
        divToggle.classList.add("active");
    } else {
        divToggle.classList.remove("active");
    }
    // 카운터 처리
    counter.innerText = state.counter;
};

// 구독하기

render();

// 추후 리액트 프로젝트에서 리덕스를 사용할 때는 이 함수(subscribe)를 직접 사용하지 않음.
store.subscribe(render);

// 액션 발생시키기: dispatch
divToggle.onclick = () => {
    console.log("div toggle onclick");
    store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
    console.log("btn increase onclick");
    store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
    console.log("btn decrease onclick");
    store.dispatch(decrease());
};
