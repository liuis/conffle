## Conflux-truffle 

### 内置智能合约编译，链接，部署和二进制（文件）管理。

不支持Test

### 一。truffle-conflux-init初始目录

1.创建没有合约的空工程，可以使用 conflux-truffle init.  这部分已经publish package。 需要调试。

​    不支持conflux-truffle-unbox 的功能。(我们可以提供git上的整个智能合约的模板， 这个工作已经完成。)

### 二。truffle-conflux-config 配置文件读取

  配置区块链网络，链接端口Port  ,  Token， 这个需要

​     这个已经publish  package 。需要调试和删减。

### 三。conflux-truffle-compile  编译合约  

  1.提供conflux-truffle  compile  

​    这部分使用solc 来编译。直接调用脚本来solc 编译。(truffle 的compile 太过复杂)

###  四。conflux-truffle-account 生成Account 和 Private Keys

Account 使用 conflux-web 的conflux-web-cfx-wallet-create 来生成， 然后根据account 

直接回调  获得token

来生成Private Keys .

### 五。发布部署编译好的智能合约到链。

truffle deploy & migrate   
