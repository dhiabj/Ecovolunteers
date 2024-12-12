import "./donation.css";
import { useState, useEffect, useRef, useContext } from "react";
import { ethers } from "ethers";
import AnimatedNumber from "react-animated-number";
import Wallet from "../../artifacts/contracts/Wallet.sol/Wallet.json";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

// let WalletAddress = "0x5F3b8A1a638De722be1C521456b1915A2871e0A3";
let WalletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Donation = () => {
  const { auth } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [amountSend, setAmountSend] = useState();
  const [amountWithdraw, setAmountWithdraw] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const send = useRef();
  const withdrawAmount = useRef();
  useEffect(() => {
    getBalance();
    console.log(auth);
  }, [balance]);

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(WalletAddress, Wallet.abi, provider);
      try {
        let overrides = {
          from: accounts[0],
        };

        const data = await contract.getBalance(overrides);
        setBalance(String(data));
      } catch (err) {
        toast.error("Une erreur est survenuee!");
      }
    }
  }

  async function transfer() {
    if (!amountSend) {
      return;
    }
    setError("");
    setSuccess("");
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const tx = {
          from: accounts[0],
          to: WalletAddress,
          value: ethers.utils.parseEther(amountSend),
        };
        const transaction = await signer.sendTransaction(tx);
        await transaction.wait();
        setAmountSend("");
        send.current.value = "";
        getBalance();

        toast.success("Donation Sent Thank you for your kindness ❤️");
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function withdraw() {
    if (!amountWithdraw) {
      return;
    }
    setError("");
    setSuccess("");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WalletAddress, Wallet.abi, signer);
    try {
      const transaction = await contract.withdrawMoney(
        accounts[0],
        ethers.utils.parseEther(amountWithdraw)
      );
      await transaction.wait();
      setAmountWithdraw("");
      getBalance();
      toast.success("Ethereum withdrawn successfully");
      withdrawAmount.current.value = "";
    } catch (err) {
      toast.error("Not enought funds !");
    }
  }

  function changeAmountSend(e) {
    setAmountSend(e.target.value);
    console.log(e.target.value);
  }

  function changeAmountWithdraw(e) {
    setAmountWithdraw(e.target.value);
  }

  return (
    <div className="Appp">
      <div className="containerr">
        <div id="space">
          <div className="elogo">
            <div className="trif u1"></div>
            <div className="trif u2"></div>
            <div className="trif u3"></div>
            <div className="trif u4"></div>
            <div className="ct"></div>
            <div className="trif l1"></div>
            <div className="trif l4"></div>
          </div>
          <h1 className="h1">Ethereum</h1>
        </div>

        <h2 className="h22">
          {" "}
          <AnimatedNumber
            style={{ transition: "0.8s ease-out" }}
            value={balance / 10 ** 18}
            fontStyle={{ fontSize: 40 }}
            duration={1000}
            locale="en-US"
            frameStyle={(perc) =>
              perc === 100 ? {} : { backgroundColor: "transparent" }
            }
          ></AnimatedNumber>
        </h2>

        {/* <h2>
            {balance / 10 ** 18} <span className="eth">eth</span>
          </h2> */}
        <div className="wallet__flex">
          {auth.role !== "admin" ? (
            <div className="walletG">
              <h3 className="h33">Send Ether</h3>
              <input
                className="input"
                ref={send}
                type="text"
                placeholder="Montant en Ethers"
                onChange={changeAmountSend}
              />
              <button className="bbutton" onClick={transfer}>
                Envoyer
              </button>
            </div>
          ) : (
            <div className="walletD">
              <h3 className="h33">Withdraw Ether</h3>
              <input
                className="input"
                ref={withdrawAmount}
                type="text"
                placeholder="Montant en Ethers"
                onChange={changeAmountWithdraw}
              />
              <button className="bbutton" onClick={withdraw}>
                Retirer
              </button>
            </div>
          )}
        </div>
        {/* {error && <p className="error ">{error}</p>}
        {success && <p className="success">{success}</p>} */}
      </div>
    </div>
  );
};

export default Donation;
