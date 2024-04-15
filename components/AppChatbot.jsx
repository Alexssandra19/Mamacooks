import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

class AppChatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChatbotOpen: true,
        };
    }

    toggleChatbot = () => {
        this.setState((prevState) => ({
            isChatbotOpen: !prevState.isChatbotOpen,
        }));
    };

    render() {
        const { isChatbotOpen } = this.state;
        // all available props
        const theme = {
            background: '#f5f8fb',
            fontFamily: 'math',
            headerBgColor: 'black',
            headerFontColor: '#fff',
            headerFontSize: '15px',
            botBubbleColor: 'black',
            botFontColor: '#fff',
            userBubbleColor: '#fff',
            userFontColor: '#4a4a4a',
        };
        return (
            <>
                <div className="chatbot-container">
                <ThemeProvider theme={theme}>
                    <ChatBot
                        steps={[
                            {
                                id: '1',
                                message: 'Welcome to Mamacooks. How can I help you today?',
                                trigger: 'askName',
                            },
                            {
                                id: 'askName',
                                message: 'Please enter your first name.',
                                trigger: 'getName',
                            },
                            {
                                id: 'getName',
                                user: true,
                                trigger: 'askLastName',
                            },
                            {
                                id: 'askLastName',
                                message: 'Please enter your last name.',
                                trigger: 'getLastName',
                            },
                            {
                                id: 'getLastName',
                                user: true,
                                trigger: 'replyWelcome',
                            },
                            {
                                id: 'replyWelcome',
                                message: 'Hi {previousValue}, nice to meet you!',
                                trigger: 'order',
                            },
                            {
                                id: 'order',
                                message: 'What would you like to order?',
                                trigger: 'userOrder',
                            },
                            {
                                id: 'userOrder',
                                user: true,
                                trigger: 'quantity',
                            },
                            {
                                id: 'quantity',
                                message: 'What quantity of {previousValue} needed.',
                                trigger: 'userOrderQuantity',
                            },
                            {
                                id: 'userOrderQuantity',
                                user: true,
                                trigger: 'replyOrder',
                            },
                            {
                                id: 'replyOrder',
                                message: 'Great! Your order for "{previousValue}" has been received.',
                                end: true,
                            },
                        ]}
                        floating={true}
                        opened={isChatbotOpen}
                        toggleFloating={this.toggleChatbot}
                        headerTitle={'MamaCock Support'}
                    />
                </ThemeProvider>
                </div>
            </>
        );
    }
}

export default AppChatbot;
