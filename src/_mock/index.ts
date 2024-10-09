import Mock from 'mockjs'

Mock.mock('/api/test','get',()=>{
    return {
        error:0,
        data:{
            name: `我去的是${Mock.Random.ctitle(5,10)}`,
        }
    }
})