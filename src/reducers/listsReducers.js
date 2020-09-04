import { CONSTANTS } from "../actions";
let listID = 2;
let cardID = 6;

const initialState = [
  {
    title: "Last Episode",
    id: `list-${0}`,
    cards: [
      {
        id: `cards-${0}`,
        text: "This is a trello clone app created by Babajide Bashiru",
      },
      {
        id: `card-${1}`,
        text: "With the use of React-Redux, Constatants",
      },
    ],
  },
  {
    title: "This Episode",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "With the use of a mix between material UI React and styled component ",
      },
      {
        id: `card-${3}`,
        text: "And also with the use of React Drag and Drop",
      },
      {
        id: `card-${4}`,
        text: "Which makes it easy to drag and drop between the cards",
      },
      {
        id: `card-${5}`,
        text: "And also drag and drop between the Lists",
      },
    ],
  },
];
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;
    }
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        //draggableId,
        type,
      } = action.payload;
      const newState = [...state];

      //dragging lists around
      if (type === "list")
      {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = newState.find(
          (list) => droppableIdStart === list.id.toString()
        );
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list

      if (droppableIdStart !== droppableIdEnd)
      {
        //find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id.toString())
      
        //pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
      
          // find the list where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id.toString());

        // put the card in a new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
        
        return newState;

    default:
      return state;
  }
};

export default listsReducer;
