// import AppRoot from './app-root';
// import Home from './home';
// import List from './list';

import Cart from './components/Cart'
import Main from './components/Main'
import Shop from './components/Shop'
import PaymentComplete from './components/PaymentComplete'

const routes = [
    { component: Main,
        routes: [
            { path: '/',
                exact: true,
                component: Main
            },
            { path: '/cart',
                component: Cart
            },
            { path: '/shop',
                component: Shop
            },
            { path: '/paymentcomplete',
                component: PaymentComplete
            },
        ]
    }
];

export default routes;
