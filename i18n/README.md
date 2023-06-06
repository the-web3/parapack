# 国际化开发指引

目前项目有`中文`/`英文`两种语言，翻译文件放置在 `src/i18n` 目录下。

翻译文件分为五个部分，对应“通用翻译”、“杂项”和“三个主要模块”：common, misc, home, product, asset :

```text
|- i18n
  |- index.ts # 组件初始化
  |- locales #　存放编译文件
    |- en_US #　英文翻译
      |- common.ts # 通用翻译
      |- home.ts # 首页
      |- product.ts # 产品
      |- asset.ts # 资产
      |- misc.ts # 杂项（如 components、hooks、或其它项目全局功能代码出现的词汇）
      |-
    |- zh_CN #　中文翻译
      |- common.ts # 通用翻译
      |- home.ts # 首页
      |- product.ts # 产品
      |- asset.ts # 资产
      |- misc.ts # 杂项（如 components、hooks、或其它项目全局功能代码出现的词汇）
```

## 如何添加翻译

开发过程中需要一个翻译时, 先在 `common.ts` 中定义 `key`, 映射对应的翻译:

```json
/** zh_CN/common.ts */
{
  "confirm": "确定"
}
```

```json
/** en_US/common.ts */
{
  "confirm": "confirm"
}
```

使用翻译：

1.在 react 组件中：

```tsx
import { useTranslation } from 'react-i18next';

const Components = () => {
  ...
  const { t } = useTranslation()
  ...
  return <>{t('common.confirm')}<>
}
```

2.在 ts 文件中使用：

```js
import i18n from '@i18n/index';

i18n.t('deploy.application_mgmt');
```

3.如果需要动态传入数据：

```json
/** zh_CN/deploy.ts */
{
  "test": "这是测试文字: {{msg}}"
}
```

```json
/** en_US/deploy.ts */
{
  "test": "this is test msg: {{msg}}"
}
```

```js
import { useTranslation } from 'react-i18next';

const Components = () => {
  ...
  const { t } = useTranslation(); //
  ...
  return <>{t('deploy.test', { msg: 'aaa' })}<>
}

# 输出为结果：这是测试文字: aaa
```
