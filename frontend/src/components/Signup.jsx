import React from 'react';

const Signup = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Signup</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                            Role
                        </label>
                        <select
                            id="role"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            <option value="admin">Admin</option>
                            <option value="author">Author</option>
                            <option value="reader">Reader</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
