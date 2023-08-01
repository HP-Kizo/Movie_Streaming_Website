import React, { useCallback, useEffect } from "react";

const useSendRequest = () => {
  // Tạo 1 custom hook để sử dụng lại nhiều lần cho việc lấy API
  const sendRequest = useCallback(async (http) => {
    try {
      const response = await fetch(http);

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();

      return await data;
    } catch (errol) {
      console.log(errol || "Something went wrong!");
    }
  }, []);

  return { sendRequest };
};

export default useSendRequest;
