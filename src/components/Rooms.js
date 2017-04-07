import React from 'react';

const handleClickOnRoom = (chooseRoom, id, fetchMessages) => (event) => {
    event.preventDefault();
    chooseRoom(id);
    fetchMessages();
};

const Rooms = ({rooms, chooseRoom, fetchMessages}) => (
        <ul className="rooms-list nav">
            {rooms
                ? rooms.get('list').map((room, roomIndex) => (
                        <li key={room.get('id')}><a onClick={handleClickOnRoom(chooseRoom, room.get('id'), fetchMessages)}>
                        {room.get('name')}
                    </a></li>))
                : null
}
        </ul>
);

export default Rooms;