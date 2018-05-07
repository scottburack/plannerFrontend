
// No need for ActionCable, just wanted to try it out

// import React from 'react'
// import Cable from 'actioncable';
//
// class ChatRoom extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentChatMessage: '',
//       chatLogs: []
//     };
//   }
//
//   componentWillMount() {
//     this.createSocket();
//   }
//
//   updateCurrentChatMessage(event) {
//     this.setState({
//       currentChatMessage: event.target.value
//     });
//   }
//
//   handleChatInputKeyPress(event) {
//     if (event.key === 'Enter') {
//       this.handleSendEvent(event);
//     }
//   }
//
//   createSocket() {
//     let cable = Cable.createConsumer('ws://localhost:3000/cable');
//     this.chats = cable.subscriptions.create({
//       channel: 'ChatChannel'
//     }, {
//       connected: () => {},
//       received: (data) => {
//         let chatLogs = this.state.chatLogs;
//         chatLogs.push(data);
//         this.setState({ chatLogs: chatLogs });
//       },
//       create: function(chatContent) {
//         this.perform('create', {
//           content: chatContent
//         });
//       }
//     });
//   }
//
//   handleSendEvent(event) {
//     event.preventDefault();
//     this.chats.create(this.state.currentChatMessage);
//     this.setState({
//       currentChatMessage: ''
//     });
//   }
//
//   renderChatLog() {
//     return this.state.chatLogs.map((el) => {
//       return (
//         <li key={`chat_${el.id}`}>
//           <span className='chat-message'>{ el.content } </span>
//           <span className='chat-created-at'> { el.created_at }</span>
//         </li>
//       );
//     });
//   }
//
//
//   render() {
//     return (
//       <div className='chat-room'>
//         <div className='stage'>
//           <h1>Chat</h1>
//           <div className='chat-logs'>
//           <ul>
//             { this.renderChatLog() }
//             </ul>
//           </div>
//           <input
//             onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
//             value={ this.state.currentChatMessage }
//             onChange={ (e) => this.updateCurrentChatMessage(e) }
//             type='text'
//             placeholder='Enter your message...'
//             className='chat-input'/>
//           <button className='send'
//             onClick={ (e) => this.handleSendEvent(e) }>
//             Send
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default ChatRoom;
