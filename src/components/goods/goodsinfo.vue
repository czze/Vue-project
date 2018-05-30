<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="goods.goodsinfo" class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.thumb_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="goodsCount" size="small" :min="1" :max="goods.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="isShowComment=false">
                                            <a href="javascript:;" :class="!isShowComment ? 'selected' : ''">商品介绍</a>
                                        </li>
                                        <li @click="isShowComment=true">
                                            <a href="javascript:;" :class="isShowComment ? 'selected' : ''">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍div -->
                            <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
                                <div class="goodsIntrodution" v-html="goods.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论div -->
                            <div v-show="isShowComment" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="commentTextRef" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentInfo.totalcount <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentInfo.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt("YYYY-MM-DD HH:mm:ss")}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 5, 10, 20]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="commentInfo.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShowAnimateImg" ref="animateImgRef" v-if="goods.imglist" class="animateImg">
                <img :src="goods.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style>
    @import "../../statics/site/js/jqimgzoom/css/magnifier.css";

    .goodsIntrodution {
        padding: 5px;
    }

    .animateImg {
        height: 50px;
        width: 50px;
        position: absolute;
        top: 0;
        left: 0;

        transition: all 0.5s;

    }

    .animateImg img {
        width: 100%;
        height: 100%;
    }



</style>


<script>

    import "../../statics/site/js/jqimgzoom/js/magnifier"

    import { Affix } from 'iview';

    export default {
        data(){
            return{
                goods:{},
                goodsCount:1,
                isShowComment:false,
                pageIndex:1,
                pageSize:2,
                commentInfo:{},
                isShowAnimateImg: false,
                addToShopCartOffset:null,
                shoppingCartCountOffset:null,
                
            }
        },
        components:{
            Affix
        },
        watch: {
            $route: function(newValue,oldValue){
                this.getGoodsInfoData();
                this.getCommentListData();                
            }
        },
        created(){
            this.getGoodsInfoData();
            this.getCommentListData();
        },
        updated(){
            $('#magnifier1').imgzoon({magnifier:'#magnifier1'});

        },
        methods: {
            getGoodsInfoData(){
                const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
                this.$axios.get(url).then(response=>{
                    this.goods = response.data.message


                    setTimeout(()=>{
                        this.addToShopCartOffset= $(this.$refs.addToShopCartRef).offset();
            
                        $(this.$refs.animateImgRef).css({
                            left: this.addToShopCartOffset.left,
                            top: this.addToShopCartOffset.top
                        })
            
                        this.shoppingCartCountOffset = $('#shoppingCartCount').offset();
                    },200)
                })
            },

            getCommentListData(){
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                this.$axios.get(url).then(response=>{
                    this.commentInfo = response.data
                })

                
            },

            handleSizeChange(pageSize){
                this.pageIndex = 1;
                this.pageSize = pageSize;
                getCommentListData();
            },

            handleCurrentChange(pageIndex){
                this.pageIndex = pageIndex;
                getCommentListData();
            },

            postComment(){
                //console.log(this.$refs.commentTextRef);
                const commenttxt = this.$refs.commentTextRef.value

                if(commenttxt.trim().length==0){
                    this.$message({
                        message: "请输入评论内容",
                        type:'warning'
                    })

                    return;
                }

                const url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
            
                this.$axios.post(url,{commenttxt}).then(response=>{

                    if(response.data.status !=0 ){
                        this.$message.error("评论失败!");
                    }

                    this.$refs.commentTextRef.value = ""

                    this.$message({
                        message: "评论成功!",
                        type:'success'
                    })

                    this.pageIndex = 1;
                    this.getCommentListData();
                })
            },
            addToShopCart(){
                this.isShowAnimateImg = true;

                const goods = {
                    goodsId:this.$route.params.goodsId,
                    count: this.goodsCount
                }

                this.$store.commit('addGoods',goods);
                
            },
            beforeEnter: function (el) {
                //
                //console.log(this.addToShopCartOffset)
                el.style.left = this.addToShopCartOffset.left + 'px';
                el.style.top = this.addToShopCartOffset.top + 'px';
                el.style.transform = "scale(1)"
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            enter: function (el, done) {
                //
                el.offsetWidth;

                //console.log(this.shoppingCartCountOffset)
                el.style.left = this.shoppingCartCountOffset.left + 'px';
                el.style.top = this.shoppingCartCountOffset.top + 'px';
                el.style.transform = "scale(0.5)"
                
                    done()
                
            },
            afterEnter: function (el) {
                //
                this.isShowAnimateImg = false;
            }
        }
    }
</script>