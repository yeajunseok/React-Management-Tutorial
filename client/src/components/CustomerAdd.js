import React from 'react';
import { post } from 'axios'; 

//CustomerAdd는 App.js에서 출력이 된다.
class CustomerAdd extends React.Component {
    // 생성자 정의
    constructor(props) { 
        super(props);
        // 변수값 초기화
        this.state = {
            file: null, //프로필사진이 들어감
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' //프로필사진의 이름이 들어감
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => { //서버로 부터 response가 건너 왔을때
                console.log(response.data); //건너온 데이터를 콘솔 창에 출력할수있게
                this.props.stateRefresh();
            })
        this.setState({
            file: null, 
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], //e.target은 이벤트가 발생한 이벤트 자체를 말한다, file[]인 이유는 특정 사이트들은 사진 업로드가 여러장이 가능하기 떄문에.
            fileName: e.target.value
        })
    }
    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    //addCustomer모둘 함수 만들기
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.userName)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            //onChange: 이벤트 처리 결과를 보여주기 위해서
            //'추가하기' 버튼 누르면 handleFormSubmit함수가 불러와진다.
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/> 
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;