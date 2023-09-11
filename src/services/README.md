## Services

存放所有接口服务，已通过 `unplugin-auto-import` 自动导入。

### 创建服务

```ts
// Example.ts
import { BaseService } from './Base'
import { http } from '@/http/axios'
import type { PageData } from '@/types/interface'

export interface ListParams {
  // ...
}

export interface ListModel {
  // ...
}

export const exampleService = new class extends BaseService {
  constructor() {
    // 传入控制器名称
    super('example')

    // 修改微服务模块
    super('example', 'module1')
  }

  /**
   * 查询列表
   */
  list(params?: ListParams) {
    return http.get<PageData<ListModel>>(this.buildURL('list'), { params })
  }
}()
```

### 使用服务

```html
<script setup lang="ts">
// 已自动导入 useRequest 和 exampleService
const { data: list } = useRequest(exampleService.list, { initData: () => [] })
</script>

<template>
  <div v-for="item in list" :key="item.id">
    {{ item.name }}
  </div>
</template>
```
