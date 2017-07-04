import React from 'react';

const handleClickOnRoom = (chooseRoom, id, fetchMessages, subscribeToMessages) => (event) => {
    event.preventDefault();
    chooseRoom(id);
    subscribeToMessages();
    fetchMessages();
};

const Rooms = ({rooms, chooseRoom, fetchMessages, subscribeToMessages}) => (
        <ul className="rooms-list nav">
            {rooms
                ? rooms.get('list').map((room, roomIndex) => (
                        <li key={room.get('id')}><a onClick={handleClickOnRoom(chooseRoom, room.get('id'), fetchMessages, subscribeToMessages)}>
                        {room.get('name')}
                    </a></li>))
                : null
}
        </ul>
);

export default Rooms;