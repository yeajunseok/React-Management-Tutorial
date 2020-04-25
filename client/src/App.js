import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class App extends Component {

  state = {
    customers: "",
    completed: 0 //completed라는 변수를 만든거 임
  }

  /*
  API를 불러와서 특정한 veiw를 출력하고자 한다면, componentDidMount()에서 API를 비동기적으로 호출하면 됨.
  응답이 돌아왔을때 state상태가 변화 되고 React에서 변화를 감지하고 알아서 뷰가 갱신 됨.
  */
  componentDidMount() {
    this.timer = setInterval(this.progress, 20) //0.02초 마다 progress 함수가 실행 되도록
    this.callAip()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callAip = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => { 
              return ( <Customer
                          key={c.id}
                          id={c.id}
                          image={c.image}
                          name={c.name}
                          birthday={c.birthday}
                          gender={c.gender}
                          job={c.job} />)
            }) :
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

/*
<Reacte의 component 라이브 사이클 순서>

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

※ component의 props 또는 state가 변경 되는 경우 shouldComponentUpdate() 함수등이 사용이 되어 다시 render()함수를 불러와서 view를 갱신하게 된다.
*/