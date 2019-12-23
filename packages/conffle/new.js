var dp = require('./deploy4contract');

var add = "0xe1680683be13895b59c94eaf61818975a0d105dd";
var pk = "0x91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac";

const contracts =  [ 'cat.sol', 'dai.sol', 'end.sol', 'flap.sol', 'flip.sol', 'flop.sol', 'join.sol', 'jug.sol', 'lib.sol', 'pot.sol', 'spot.sol', 'vat.sol', 'vow.sol' ]

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
}
async function test () {
  //var nums = await getNumbers()
  asyncForEach(contracts, async x => {
      var res = await dp(add, pk, x)
      console.log(res)
    })
}
test()
