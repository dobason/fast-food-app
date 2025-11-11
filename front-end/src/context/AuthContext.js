import React, { createContext, useState, useContext, Children } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token')); //getItem để lấy token từ user

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken); //lưu token vào localStorage
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); //xóa token khỏi localStorage
    }

    return (
        // value = {{}} Các giá trị mà bất kỳ component nào trong ứng dụng có thể truy cập
        <AuthContext.Provider value = {{ user, token, login, logout }}> 
            {Children}
        </AuthContext.Provider>
    );
};
    //Custome hook để sử dụng context dễ dàng hơn
    export const useAuth = () => useContext(AuthContext);


