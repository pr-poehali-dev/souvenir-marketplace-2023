const API_URLS = {
  auth: 'https://functions.poehali.dev/4ac1c8f2-8a33-4398-b0a3-09acc0517d6c',
  orders: 'https://functions.poehali.dev/0abbf59c-d3b9-42e2-ad33-2085128643c6',
  profile: 'https://functions.poehali.dev/e1e4bbf6-bf79-479c-950b-d80d41148ead',
};

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  user_id?: number;
  error?: string;
}

export interface Order {
  id: number;
  total_amount: number;
  status: string;
  delivery_address: string;
  delivery_method: string;
  payment_method: string;
  created_at: string;
  items: Array<{
    product_name: string;
    product_price: number;
    quantity: number;
  }>;
}

export const authAPI = {
  register: async (email: string, password: string, full_name: string, phone: string): Promise<AuthResponse> => {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', email, password, full_name, phone }),
    });
    return response.json();
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    return response.json();
  },
};

export const profileAPI = {
  getProfile: async (userId: number): Promise<{ user: User }> => {
    const response = await fetch(API_URLS.profile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId.toString(),
      },
    });
    return response.json();
  },

  updateProfile: async (userId: number, full_name: string, phone: string): Promise<{ success: boolean; user: User }> => {
    const response = await fetch(API_URLS.profile, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId.toString(),
      },
      body: JSON.stringify({ full_name, phone }),
    });
    return response.json();
  },
};

export const ordersAPI = {
  getOrders: async (userId: number): Promise<{ orders: Order[] }> => {
    const response = await fetch(API_URLS.orders, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId.toString(),
      },
    });
    return response.json();
  },

  createOrder: async (
    userId: number,
    items: Array<{ name: string; price: number; quantity: number }>,
    totalAmount: number,
    deliveryAddress: string,
    deliveryMethod: string,
    paymentMethod: string
  ): Promise<{ success: boolean; order_id: number }> => {
    const response = await fetch(API_URLS.orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId.toString(),
      },
      body: JSON.stringify({
        items,
        total_amount: totalAmount,
        delivery_address: deliveryAddress,
        delivery_method: deliveryMethod,
        payment_method: paymentMethod,
      }),
    });
    return response.json();
  },
};