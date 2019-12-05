import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import Heading from './app/Heading';
import Input from './app/Input';
import Button from './app/Button';
import TodoList from './app/TodoList';
import TabBar from './app/TabBar';

let todoIndex = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [],
      type: 'All',
    };
    this.submitTodo = this.submitTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.setType = this.setType.bind(this);
  }
  setType(type) {
    this.setState({type});
  }

  deleteTodo(todoIndex) {
    let {todos} = this.state;
    todos = todos.filter(todo => todo.todoIndex !== todoIndex);
    this.setState({todos});
  }

  toggleComplete(todoIndex) {
    let todos = this.state.todos;
    todos.forEach(todo => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
    this.setState({todos});
  }

  inputChange(inputValue) {
    console.log('Input Value : ', inputValue);
    this.setState({inputValue});
  }

  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }
    const todo = {
      title: this.state.inputValue,
      todoIndex,
      complete: false,
    };
    todoIndex++;
    const todos = [...this.state.todos, todo];
    this.setState({todos, inputValue: ''}, () => {
      console.log('State : ', this.state);
    });
  }

  render() {
    const {inputValue, todos, type} = this.state;
    return (
      <View stype={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={text => this.inputChange(text)}
          />
        </ScrollView>
        <TodoList
          todos={todos}
          toggleComplete={this.toggleComplete}
          deleteTodo={this.deleteTodo}
          type={type}
        />
        <Button submitTodo={this.submitTodo} />
        <TabBar type={type} setType={this.setType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingTop: 60,
  },
});

export default App;
