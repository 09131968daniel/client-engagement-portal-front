import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { axiosInstance } from '../../util/axiosConfig';
import { IRootState } from '../../_reducers';
import { INotificationState } from '../../_reducers/NotificationReducer';
import './Notifications.scss';

/**
 * This component creates an Accordion element that is populated with the current notification state.
 * Once it reaches a certain height, an overflow attribute will trigger and turn the notifications into a scrollable box.
 *
 * @param props the current state of notifications
 *
 * @returns An Accordion element populated with all current requests for more Talent and desires to stage Interventions/Request more talent.
 */
const Notifications:React.FC<INotificationState> = (props:INotificationState) => {

    const [requests, gotRequests] = useState(false);

    if(!requests) {
        axiosInstance().then((axios) => {
            axios.get("intervention/")
            .then((result) => {
                console.log(result.data)
            })
            .catch((err) => {
                console.log(err);
            })
        }).then(() => {gotRequests(true)})
    }

    return (
        <Accordion className="notifs-container">
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id="notif-header">
                    Notifications
                </Accordion.Toggle>


                <Accordion.Collapse eventKey="0">
                        <div>
                            <Accordion className="notifs">
                                {props.notifications?.map(
                                        (e, i) =>
                                        <>
                                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={i.toString()} id="notif-toggle">
                                                <Table className="notif-table" hover>
                                                    <tbody>
                                                        <tr className="notif-row">
                                                            <td>{e.client.companyName}</td>
                                                            <td>{e.requestType}</td>
                                                            <td>{e.createdDate.getMonth()}/{e.createdDate.getDate()}/{e.createdDate.getFullYear()}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={i.toString()} key={i}>
                                                <div>
                                                    Status: {e.status}
                                                    <br/>
                                                    Client Email: {e.client.email}
                                                    <br/>
                                                    Client Phone Number: {e.client.phoneNumber}
                                                </div>
                                            </Accordion.Collapse>
                                        </>
                                    )
                                }
                            </Accordion>
                        </div>
                    </Accordion.Collapse>
        </Accordion>
    )
}

/**
 * Gets the notification state to be mapped to the props for the Notification component.
 *
 * @param state current state that holds all other states
 */
const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

/**
 * Sends the current notification state to the Notification component.
 */
export default connect(mapStateToProps)(Notifications);
