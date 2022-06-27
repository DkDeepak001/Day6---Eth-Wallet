
const Wallet = artifacts.require('Wallet')

contract('Wallet',(accounts) => {
    let wallet = null;

    before(async ()=> {
        wallet = await Wallet.deployed()
    })
    
    //it should set accunts[0]
    it('It should set constructor accounts ', async () => {
        const owner = await wallet.owner();
        assert(owner === accounts[0]);
    });

    //deposite to ether wallet
    it('It should Deposite ether to wallet', async ()=> {
        const deposite = await wallet.deposite({
            from:accounts[0],
            value:100
        });

        const result = await web3.eth.getBalance(wallet.address);
        assert(parseInt(result) === 100);
    });

    it("It should return balance", async ()=> {
        const result = await wallet.checkBalance();
        assert(parseInt(result) === 100);
    })

    it("It should transfer ether to other wallet", async ()=> {
        const balanceRecipientBefore = await web3.eth.getBalance(accounts[1]);
        await wallet.sendTo(accounts[1],50, {from:accounts[0]});
        const balanceWallet = await web3.eth.getBalance(wallet.address)
        console.log(balanceWallet);
        assert(parseInt(balanceWallet) === 50)
        
        const balanceRecipientAfter = await web3.eth.getBalance(accounts[1]);
        const finalBalance = web3.utils.toBN(balanceRecipientAfter);
        const initalBalance = web3.utils.toBN(balanceRecipientBefore);
        assert(finalBalance.sub(initalBalance).toNumber() === 50);
    
    })

    it("should not transfer ether if TX not sent from ownet", async ()=> {
        try{
            await wallet.sendTo(accounts[1], 50 , { from : accounts[2]});
        }
        catch(e){
            assert(e.message.includes('Sender not allowed'));
            return;
        }
        assert(false);
    })


})