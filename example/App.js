import React, {Component} from 'react';
import update from 'react-addons-update';
import Tabs from "../build/index"
// import Tabs from "react-draggable-tabs"

class App extends Component {
    constructor(props) {
        super(props)
        this.moveTab = this.moveTab.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.closedTab = this.closedTab.bind(this);
        this.addTab = this.addTab.bind(this);
        this.editTab = this.editTab.bind(this);
        this.enableTabEdit = this.enableTabEdit.bind(this);
        this.state = {
            tabs: [
                {
                    id: 1,
                    active: true,
                    content: "test 1",
                    isContentEditable: false,
                    display: <img src="http://memecrunch.com/meme/RFHY/cute-cat/image.png" alt="cute cat" width="500px"/>
                },
                {
                    id: 2,
                    content: "test 2",
                    isContentEditable: false,
                    display: <img src="http://slappedham.com/wp-content/uploads/2014/06/Cute-White-Dog.jpg" alt="cute dog" width="500px"/>
                },
                {
                    id: 3,
                    content: "test 3",
                    isContentEditable: false,
                    display: <h1>Hi</h1>
                },
            ]
        };
    }

    moveTab(dragIndex, hoverIndex) {
        const {tabs} = this.state;
        const dragTab = tabs[dragIndex];

        this.setState(update(this.state, {
            tabs: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragTab]
                ]
            }
        }));
    }

    selectTab(selectedIndex, selectedID) {
        this.setState((state, props) => {
            const newTabs = state.tabs.map(tab => ({
                ...tab,
                active: tab.id === selectedID
            }))
            return {tabs: newTabs}
        })
    }

    editTab(e, selectedID) {
        let newContent = e.target.value;
        this.setState((state, props) => {
            const newTabs = state.tabs.map(tab => ({
                ...tab,
                active: tab.id === selectedID,
                content: tab.id === selectedID ? newContent : tab.content
            }))
            return {tabs: newTabs}
        });
    }

    enableTabEdit(isContentEditable, selectedID, inputEl) {
        this.setState((state, props) => {
            const newTabs = state.tabs.map(tab => ({
                ...tab,
                active: tab.id === selectedID,
                isContentEditable: tab.id === selectedID && !isContentEditable  //Toggle the editable input for the tab content
            }))
            return {tabs: newTabs}
        }, () => {
            inputEl.select(); // highlight the value of the input
        })
    }

    closedTab(removedIndex, removedID) {
        this.setState((state, props) => {
            let newTabs = [...state.tabs]
            newTabs.splice(removedIndex, 1)

            if (state.tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
                const newActive = removedIndex === 0
                    ? 0
                    : removedIndex - 1
                newTabs[newActive].active = true;
            }

            return {tabs: newTabs}
        })
    }

    addTab(){
        this.setState((state,props)=>{
            let newTabs = [...state.tabs]
            newTabs.push({
                id: newTabs.length+1,
                content: 'Cute *',
                display: <div key={newTabs.length+1}>Cute *</div>
            })

            return {tabs: newTabs}
        })
    }
    render() {
        const activeTab = this.state.tabs.filter(tab => tab.active === true)
        return (
            <div>
                <Tabs moveTab={this.moveTab} selectTab={this.selectTab} closeTab={this.closedTab} editTab={this.editTab} enableTabEdit={this.enableTabEdit} tabs={this.state.tabs}>
                    <button onClick={this.addTab}>+</button>
                </Tabs>
                {activeTab.length !== 0
                    ? activeTab[0].display
                    : ""}
            </div>
        );
    }
}

export default  App
