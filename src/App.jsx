import PropTypes from "prop-types";
import { useState } from "react";

let friendsList = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [initialFriends, setInitialFriends] = useState(friendsList);
  const [selectedFriend, setSelectedFriend] = useState({});
  const [showForm, setShowForm] = useState(false);

  function handleSplitBill(value) {
    setInitialFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend({});
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          initialFriends={initialFriends}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          showForm={showForm}
          setShowForm={setShowForm}
        />
        <FormAddFriend
          initialFriends={initialFriends}
          setInitialFriends={setInitialFriends}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </div>
      {Object.keys(selectedFriend).length !== 0 ? (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}

function FriendsList({
  initialFriends,
  selectedFriend,
  setSelectedFriend,
  showForm,
  setShowForm,
}) {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ))}
    </ul>
  );
}
FriendsList.propTypes = {
  initialFriends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ),
  selectedFriend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
  setSelectedFriend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

// eslint-disable-next-line no-unused-vars
function Friend({
  friend,
  selectedFriend,
  setSelectedFriend,
  showForm,
  setShowForm,
}) {
  const isSelected = selectedFriend.id === friend.id;

  const [toggle, setToggle] = useState(false);
  const addSelectedFriend = () => {
    setSelectedFriend(toggle ? {} : friend);
    setShowForm(false);
  };
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">You and {friend.name} are even </p>
      )}
      <button className="button" onClick={addSelectedFriend}>
        {!isSelected ? "select" : "close"}
      </button>
    </li>
  );
}

Friend.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
  selectedFriend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
  setSelectedFriend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

function FormAddFriend({
  initialFriends,
  setInitialFriends,
  showForm,
  setShowForm,
}) {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addFriend = (e) => {
    e.preventDefault();
    const newFriend = {
      id: Date.now(),
      name: friendName,
      image: imageUrl,
      balance: 0,
    };

    setInitialFriends([...initialFriends, newFriend]);
    setFriendName("");
    setImageUrl("");
    setShowForm(false);
  };
  return (
    <div>
      {!showForm && (
        <button className="add-friend-button button" onClick={toggleForm}>
          Add Friend
        </button>
      )}
      {showForm && (
        <>
          <form action="" className="form-add-friend" onSubmit={addFriend}>
            <label>Friend name: </label>
            <input
              type="text"
              id="friendName"
              name="friendName"
              onChange={({ target }) => setFriendName(target.value)}
              value={friendName}
            />

            <label> Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />

            <button className="button">Add Friend</button>
          </form>
          <button className="close-button button" onClick={toggleForm}>
            Close
          </button>
        </>
      )}
    </div>
  );
}

FormAddFriend.propTypes = {
  initialFriends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ),
  setInitialFriends: PropTypes.func.isRequired,
};

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [WhoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = billValue ? billValue - paidByUser : "";

  function handleClick(e) {
    e.preventDefault();
    if (!billValue || !paidByFriend) return;
    onSplitBill(WhoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleClick}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > billValue
              ? paidByUser
              : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}&apos;s expense</label>

      <input type="text" value={paidByFriend} disabled />

      <label>Who is paying the bill? </label>
      <select
        value={WhoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="you">you</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}

FormSplitBill.propTypes = {
  initialFriends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ),
  selectedFriend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};
