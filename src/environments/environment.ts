export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3000',
  server: 'http://localhost:8000',
  routes: {
    authRoutes: {
      register: '/api/auth/register',
      login: '/api/auth/login',
      verify: '/api/auth/login',
      logout: '/api/auth/logout',
      status: '/api/auth/status'
    },
    restaurantRoutes: {
      getMenu: '/api/restaurant/getmenu',
      getRestaurants: '/api/restaurant/getrestaurants'
    },
    orderRoutes: {
      create: '/api/order/create'
    },
    wirtRoutes: {
      getOwnRestaurants: '/api/wirt/getownrestaurants',
      updateRestaurant: '/api/wirt/updaterestaurant',
      createDish: '/api/wirt/createdish',
      updateDish: '/api/wirt/updatedish',
      removeDish: '/api/wirt/deactivatedish',
      getActiveOrders: '/api/wirt/getactiveorders',
      markOrderAsCompleted: '/api/wirt/markorderascompleted',
      getOrderHistory: '/api/wirt/getorderhistory'
    },
    adminRoutes: {
      updateUser: '/api/admin/editUser',
      updateRestaurant: '/api/admin/editRestaurant',
      getAllUsers: '/api/admin/getAllUsers',

    }
  }
};
