import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Navigate } from 'react-router-dom';
import MenuItem from '../models/product.js';

class AppChatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChatbotOpen: true,
            name: '',
            apiData: [],
            login: false,
            registration: false,
            products: false,
            cart: false,
            user: false,
            checkout: false,
            redirectOption: [],
            userD: null,
        };
    }

    componentDidMount() {
        this.fetchProducts();
    };

    toggleChatbot = () => {
        this.setState((prevState) => ({
            isChatbotOpen: !prevState.isChatbotOpen,
        }));
    };

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    fetchProducts = async () => {
        try {
            const response = await fetch('/api/menuItems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const menuData = await response.json();
            const mappedMenuItems = menuData.data.map((menu) => {
                return new MenuItem(menu);
            });
            this.setState({ apiData: mappedMenuItems });
        } catch (error) {
            alert('Failed to get Menu Items');
            console.error('Failed to get Menu Items:', error);
        }
    };

    render() {
        const userId = sessionStorage.getItem('UserId');
        const { isChatbotOpen, name, apiData, login, registration, products, cart, user, checkout, redirectOption, userD } = this.state;
        let redirectOptions = [];
        if (userId) {
            redirectOptions = [
                { value: 'prod', label: 'Products', trigger: 'redirectTo' },
                { value: 'cart', label: 'Cart', trigger: 'redirectTo' },
                { value: 'user', label: 'User', trigger: 'redirectTo' },
                { value: 'checkout', label: 'Checkout', trigger: 'redirectTo' },
            ]
        } else {
            redirectOptions = [
                { value: 'prod', label: 'Products', trigger: 'redirectTo' },
                { value: 'reg', label: 'Registration', trigger: 'redirectTo' },
                { value: 'login', label: 'Login', trigger: 'redirectTo' },
            ]
        }
        let optionsDataVeg = apiData
            .filter(item => item.category == 'veg')
            .map(product => ({
                value: product._id,
                label: product.name,
                trigger: 'askQuantity'
            }));
        let optionsDataNonVeg = apiData
            .filter(item => item.category == 'nonVeg')
            .map(product => ({
                value: product._id,
                label: product.name,
                trigger: 'askQuantity'
            }));
        let optionsData = apiData
            .map(product => ({
                value: product._id,
                label: product.name,
                trigger: 'askQuantity'
            }));
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
                {login ? <Navigate to="/login" replace="true" />
                    : registration ? <Navigate to="/registration" replace="true" />
                        : products ? <Navigate to="/products" replace="true" />
                            : cart ? <Navigate to="/cart" replace="true" />
                                : checkout ? <Navigate to="/checkout" replace="true" />
                                    : user ? <Navigate to="/user-details" replace="true" />
                                        : <></>},
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
                                    trigger: 'firstName',
                                },
                                {
                                    id: 'firstName',
                                    user: true,
                                    trigger: 'askLastName',
                                },
                                {
                                    id: 'askLastName',
                                    message: 'Please enter your last name.',
                                    trigger: 'lastName',
                                },
                                {
                                    id: 'lastName',
                                    user: true,
                                    trigger: 'replyWelcome',
                                },
                                {
                                    id: 'replyWelcome',
                                    message: ({ steps }) => `Hi ${this.capitalizeFirstLetter(steps.firstName.value)} ${this.capitalizeFirstLetter(steps.lastName.value)}, welcome to mamacooks!`,
                                    trigger: 'askAction',
                                },
                                {
                                    id: 'askAction',
                                    message: 'Would you like to order?',
                                    trigger: 'action',
                                },
                                {
                                    id: 'action',
                                    options: [
                                        { value: 'yes', label: 'Yes', trigger: 'checkLoggedIn' },
                                        { value: 'no', label: 'No', trigger: 'askExplore' },
                                    ],
                                },
                                {
                                    id: 'checkLoggedIn',
                                    message: () => {
                                        return !userId ? 'Please Login before we procceed.' : '.....';
                                    },
                                    trigger: () => {
                                        if (userId) {
                                            return 'askCategory';
                                        }
                                        setTimeout(() => {
                                            this.setState({ login: true });
                                        }, 2000);
                                    }
                                },
                                {
                                    id: 'askCategory',
                                    message: () => {
                                        // this.fetchProducts();
                                        return 'What would you like to order? Please choose the category';
                                    },
                                    trigger: 'category',
                                },
                                {
                                    id: 'category',
                                    options: [
                                        { value: '', label: 'All', trigger: 'askProduct' },
                                        { value: 'veg', label: 'Veg', trigger: 'askProduct' },
                                        { value: 'nonVeg', label: 'Non Veg', trigger: 'askProduct' }
                                    ],
                                },
                                {
                                    id: 'askProduct',
                                    message: 'Please select the item you wish you order',
                                    trigger: ({ steps }) => { 
                                        return steps.category.value == 'veg'? 'item-veg'
                                        : steps.category.value == 'nonVeg'? 'item-nonveg'
                                        : 'item';
                                    },
                                },
                                {
                                    id: 'item',
                                    options: optionsData,
                                },
                                {
                                    id: 'item-veg',
                                    options: optionsDataVeg,
                                },
                                {
                                    id: 'item-nonveg',
                                    options: optionsDataNonVeg,
                                },
                                {
                                    id: 'askQuantity',
                                    message: 'What quantity of {previousValue} needed.',
                                    trigger: 'quantity',
                                },
                                {
                                    id: 'quantity',
                                    user: true,
                                    trigger: 'replyOrder',
                                },
                                {
                                    id: 'replyOrder',
                                    message: ({ steps }) => { `Great! Your order for "${steps.item.value}" ${steps.quantity.value}" has been added to cart.` },
                                    end: true,
                                },
                                {
                                    id: 'askExplore',
                                    message: 'Would you like to explore website?',
                                    trigger: 'redirect',
                                },
                                {
                                    id: 'redirect',
                                    options: redirectOptions,
                                },
                                {
                                    id: 'redirectTo',
                                    message:  'You will be redirected',
                                    trigger: ({ steps }) => {
                                        setTimeout(() => {
                                            switch (steps.redirect.value.toString()) {
                                                case 'reg':
                                                    this.setState({ registration: true });
                                                    break;
                                                case 'prod':
                                                    this.setState({ products: true });
                                                    break;
                                                case 'login':
                                                    this.setState({ login: true });
                                                    break;
                                                case 'cart':
                                                    this.setState({ cart: true });
                                                    break;
                                                case 'user':
                                                    this.setState({ user: true });
                                                    break;
                                                case 'checkout':
                                                    this.setState({ checkout: true });
                                                    break;
                                                default:
                                                    this.setState({ login: true });
                                                    break;
                                            }
                                            return '1';
                                        }, 2000);
                                    },
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
