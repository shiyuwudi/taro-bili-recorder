import Taro from "@tarojs/taro";

export const toast = (title) => {
  return Taro.showToast({
    title,
  });
}
