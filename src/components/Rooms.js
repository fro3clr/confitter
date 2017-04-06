import React from 'react';

const handleClickOnRoom = (chooseRoom, id, fetchMessages) => (event) => {
    event.preventDefault();
    chooseRoom(id);
    fetchMessages();
};

const Rooms = ({rooms, chooseRoom, fetchMessages}) => (
    <div className="rooms">
        <ul className="rooms-list">
            {rooms
                ? rooms.get('list').map((room, roomIndex) => (
                        <button onClick={handleClickOnRoom(chooseRoom, room.get('id'), fetchMessages)} key={room.get('id')}>
                        {room.get('name')}
                    </button>))
                : null
}
        </ul>
    </div>
);

export default Rooms;