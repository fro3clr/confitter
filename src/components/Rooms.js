import React from 'react';

const handleClickOnRoom = (chooseRoom, room, fetchMessages, subscribeToMessages) => (event) => {
    event.preventDefault();
    chooseRoom(room);
    subscribeToMessages();
    fetchMessages();
};

const Rooms = ({rooms, chooseRoom, fetchMessages, subscribeToMessages}) => (
    <ul className="rooms-list nav">
        <li><span>Rooms</span></li>
        {rooms
            ? rooms.map((room, roomIndex) => (
                <li key={room.id}><a onClick={handleClickOnRoom(chooseRoom, room, fetchMessages, subscribeToMessages)}>
                    {room.name}
                </a></li>))
            : null
        }
    </ul>
);

export default Rooms;