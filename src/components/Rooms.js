import React from 'react';

const handleClickOnRoom = (chooseRoom, id) => (event) => {
    event.preventDefault();
    chooseRoom(id);
};

const Rooms = ({rooms, chooseRoom}) => (
    <div className="rooms">
        <ul className="rooms-list">
            {rooms
                ? rooms.get('list').map((room, roomIndex) => (
                        <button onClick={handleClickOnRoom(chooseRoom, room.get('id'))} key={room.get('id')}>
                        {room.get('name')}
                    </button>))
                : null
}
        </ul>
    </div>
);

export default Rooms;