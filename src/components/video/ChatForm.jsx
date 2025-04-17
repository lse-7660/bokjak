import EmojiPicker from 'emoji-picker-react';
import { ChatFormWrap } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../../store/modules/chatSlice';
import { useState } from 'react';
import {
    ArrowUp,
    CaretUp,
    Smiley,
} from '@phosphor-icons/react';

const ChatForm = () => {
    const { user } = useSelector((state) => state.authR);
    const dispatch = useDispatch();
    const [text, setText] = useState({
        username: user.username,
        reply: '',
    });
    const { isEmojiOpen } = useSelector(
        (state) => state.chatR
    );

    const changeInput = (e) => {
        const { value, name } = e.target;
        setText({ ...text, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const username = user.username;
        if (!text.reply.trim()) return;
        dispatch(chatActions.addChat(text, username));
        setText({ ...text, reply: '' });
    };

    const onEmojiClick = (emoji) => {
        dispatch(chatActions.setEmoji(emoji));
    };

    return (
        <ChatFormWrap
            onSubmit={onSubmit}
            className="chatform-wrap"
        >
            <EmojiPicker
                className="emoji-picker"
                open={isEmojiOpen}
                onEmojiClick={onEmojiClick}
                width="80%"
                suggestedEmojisMode="recent"
                theme="dark"
                style={{ backgroundColor: '#2d2d2d' }}
            />
            <Smiley
                className="emoji-picker-btn"
                onClick={() =>
                    dispatch(chatActions.toggleEmoji())
                }
            />
            <input
                className="chat-input-bar"
                value={text.reply}
                onChange={changeInput}
                name="reply"
                placeholder="채팅 보내기"
            />
            <button
                className="chatform-submit-btn"
                type="submit"
            >
                <span className="hide">채팅 보내기</span>
                <ArrowUp color="white" size={20} />
            </button>
        </ChatFormWrap>
    );
};

export default ChatForm;
