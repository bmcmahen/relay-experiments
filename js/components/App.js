class App extends React.Component {

  render() {
    console.log(this.props)

    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          hi
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
      }
    `,
  },
});
