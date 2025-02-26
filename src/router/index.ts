import { createRouter, createWebHistory } from 'vue-router';
//追加
import MainTodo from '@/views/MainTodo.vue';
import About from '@/views/About.vue';

const router = createRouter({
  history: createWebHistory(),
  routes:[
    //追加
    {
      path: '/',
      name: 'mainTodo',
      component: MainTodo,
    },
    {
      path: '/mainTodo',
      name: 'mainTodo',
      component: MainTodo,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/Blog.vue'),
    },
    {
      path: '/blog/:id', // 「　/:id　」　を追加
      name: 'blogId',
      component: () => import('@/views/Blog.vue'),
    },
    {
      path: '/:pathMatch(.*)*', //存在しないアドレスにマッチする指定
      name: 'notFound',
      component: () => import('@/views/NotFound.vue'),
    }
  ]
});

export default router;
