import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import './posts.scss'

export class Modal extends Component<any, any> {
    render() {
        const {open, close} = this.props;

        return (
            <div>
                {open? (
                    <div className={open? 'modal open':'modal'}>
                        <div className="body">{this.props.children}</div>
                        <Button className="close" variant="primary" onClick={close}>닫기</Button>
                    </div>
                ):null}
            </div>
        )
    }
}

export default Modal