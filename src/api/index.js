export default {
    apiList: [
        {
            module: 'account',
            module_desc: '账号api',
            data: [
                {
                    func: 'AccountLogin',
                    url: '/auth/login',
                    method: 'post'
                },
                {
                    func: 'AccountRegister',
                    url: '/auth/register',
                    method: 'post'
                },
                {
                    func: 'AccountLogout',
                    url: '/auth/logout',
                    method: 'post'
                },
            ]
        },
        {
            module: 'admin',
            module_desc: '后台管理员相关接口',
            data: [
                {
                    func: 'AdminIndex',
                    url: '/admin/index',
                    method: 'get'
                },
                {
                    func: 'AdminSearch',
                    url: '/admin/index',
                    method: 'post'
                },
                {
                    func: 'AdminShow',
                    url: '/admin/show',
                    method: 'get'
                },
                {
                    func: 'AdminStore',
                    url: '/admin/store',
                    method: 'post'
                },
                {
                    func: 'AdminUpdate',
                    url: '/admin/update',
                    method: 'post'
                },
                {
                    func: 'AdminDelete',
                    url: '/admin/delete',
                    method: 'post'
                },
            ]
        },
        {
            module: 'attachment',
            module_desc: '附件相关接口',
            data: [
                {
                    func: 'AttachmentIndex',
                    url: '/attachment/index',
                    method: 'get'
                },
                {
                    func: 'AttachmentSearch',
                    url: '/attachment/index',
                    method: 'post'
                },
                {
                    func: 'AttachmentShow',
                    url: '/attachment/show',
                    method: 'get'
                },
                {
                    func: 'AttachmentStore',
                    url: '/attachment/store',
                    method: 'post'
                },
                {
                    func: 'AttachmentUpdate',
                    url: '/attachment/update',
                    method: 'post'
                },
                {
                    func: 'AttachmentDelete',
                    url: '/attachment/delete',
                    method: 'post'
                },
            ]
        },
        {
            module: 'auth',
            module_desc: '权限相关接口',
            data: [
                {
                    func: 'AuthIndex',
                    url: '/auth/index',
                    method: 'get'
                },
                {
                    func: 'AuthSearch',
                    url: '/auth/index',
                    method: 'post'
                },
                {
                    func: 'AuthShow',
                    url: '/auth/show',
                    method: 'get'
                },
                {
                    func: 'AuthStore',
                    url: '/auth/store',
                    method: 'post'
                },
                {
                    func: 'AuthUpdate',
                    url: '/auth/update',
                    method: 'post'
                },
                {
                    func: 'AuthDelete',
                    url: '/auth/delete',
                    method: 'post'
                },
            ]
        },
        {
            module: 'comment',
            module_desc: '评论相关接口',
            data: [
                {
                    func: 'CommentIndex',
                    url: '/comment/index',
                    method: 'get'
                },
                {
                    func: 'CommentSearch',
                    url: '/comment/index',
                    method: 'post'
                },
                {
                    func: 'CommentShow',
                    url: '/comment/show',
                    method: 'get'
                },
                {
                    func: 'CommentStore',
                    url: '/comment/store',
                    method: 'post'
                },
                {
                    func: 'CommentUpdate',
                    url: '/comment/update',
                    method: 'post'
                },
                {
                    func: 'CommentDelete',
                    url: '/comment/delete',
                    method: 'post'
                },
            ]
        },
        {
            module: 'post',
            module_desc: '账号api',
            data: [
                {
                    func: 'PostIndex',
                    url: '/post/index',
                    method: 'get'
                },
                {
                    func: 'PostSearch',
                    url: '/post/index',
                    method: 'post'
                },
                {
                    func: 'PostShow',
                    url: '/post/show',
                    method: 'get'
                },
                {
                    func: 'PostStore',
                    url: '/post/store',
                    method: 'post'
                },
                {
                    func: 'PostUpdate',
                    url: '/post/update',
                    method: 'post'
                },
                {
                    func: 'PostDelete',
                    url: '/post/delete',
                    method: 'post'
                },
            ]
        },
        {
            module: 'tag',
            module_desc: '标签相关接口',
            data: [
                {
                    func: 'TagIndex',
                    url: '/tag/index',
                    method: 'get'
                },
                {
                    func: 'TagSearch',
                    url: '/tag/index',
                    method: 'post'
                },
                {
                    func: 'TagShow',
                    url: '/tag/show',
                    method: 'get'
                },
                {
                    func: 'TagStore',
                    url: '/tag/store',
                    method: 'post'
                },
                {
                    func: 'TagUpdate',
                    url: '/tag/update',
                    method: 'post'
                },
                {
                    func: 'TagDelete',
                    url: '/tag/delete',
                    method: 'post'
                },
            ]
        },
        {
            module: 'user',
            module_desc: '用户相关接口',
            data: [
                {
                    func: 'UserIndex',
                    url: '/user/index',
                    method: 'get'
                },
                {
                    func: 'UserSearch',
                    url: '/user/index',
                    method: 'post'
                },
                {
                    func: 'UserShow',
                    url: '/user/show',
                    method: 'get'
                },
                {
                    func: 'UserStore',
                    url: '/user/store',
                    method: 'post'
                },
                {
                    func: 'UserUpdate',
                    url: '/user/update',
                    method: 'post'
                },
                {
                    func: 'UserDelete',
                    url: '/user/delete',
                    method: 'post'
                },
            ]
        }
    ],
    searchList: [
        {
            module: 'admin',
            module_desc: '后台管理员相关接口',
            data: [
                {
                    func: 'AdminIndex',
                    url: '/admin/index',
                    method: 'get'
                },
                {
                    func: 'AdminSearch',
                    url: '/admin/index',
                    method: 'post'
                }
            ]
        },
        {
            module: 'attachment',
            module_desc: '附件相关接口',
            data: [
                {
                    func: 'AttachmentIndex',
                    url: '/attachment/index',
                    method: 'get'
                },
                {
                    func: 'AttachmentSearch',
                    url: '/attachment/index',
                    method: 'post'
                }
            ]
        },
        {
            module: 'auth',
            module_desc: '权限相关接口',
            data: [
                {
                    func: 'AuthIndex',
                    url: '/auth/index',
                    method: 'get'
                },
                {
                    func: 'AuthSearch',
                    url: '/auth/index',
                    method: 'post'
                }
            ]
        },
        {
            module: 'comment',
            module_desc: '评论相关接口',
            data: [
                {
                    func: 'CommentIndex',
                    url: '/comment/index',
                    method: 'get'
                },
                {
                    func: 'CommentSearch',
                    url: '/comment/index',
                    method: 'post'
                }
            ]
        },
        {
            module: 'post',
            module_desc: '账号api',
            data: [
                {
                    func: 'PostIndex',
                    url: '/post/index',
                    method: 'get'
                },
                {
                    func: 'PostSearch',
                    url: '/post/index',
                    method: 'post'
                }
            ]
        },
        {
            module: 'tag',
            module_desc: '标签相关接口',
            data: [
                {
                    func: 'TagIndex',
                    url: '/tag/index',
                    method: 'get'
                },
                {
                    func: 'TagSearch',
                    url: '/tag/index',
                    method: 'post'
                }
            ]
        },
        {
            module: 'user',
            module_desc: '用户相关接口',
            data: [
                {
                    func: 'UserIndex',
                    url: '/user/index',
                    method: 'get'
                },
                {
                    func: 'UserSearch',
                    url: '/user/index',
                    method: 'post'
                }
            ]
        }
    ]
}