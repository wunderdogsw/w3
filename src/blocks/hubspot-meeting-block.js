import React from 'react'

const HubSpotMeetingBlock = ({ data }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data.html.html }}></div>
    )
}

export default HubSpotMeetingBlock;