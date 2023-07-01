function isVaild(value) {
    return this?.pattern?.test(value?.trim());
}
export const rules = {
    password: {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{8,}/,
        message: '密码不少于8位,至少包含1个字母和一个数字',
        isVaild,
    },
    walletName: {
        pattern: /^[A-Za-z][A-Za-z\d_]{0,32}$/,
        message: '钱包名不多于32个字符,大小写字母开头,大小写字母+数字+下划线',
        isVaild,
    },
};
