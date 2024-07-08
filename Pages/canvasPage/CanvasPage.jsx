import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import Header from "../../componet/Header/Header";
import { SketchPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import "./CanvasPage.scss";

const emotions = {
  happy: [
    "Proverbs 17:22 - A joyful heart is good medicine, but a crushed spirit dries up the bones.",
    "Psalm 126:2 - Our mouths were filled with laughter, our tongues with songs of joy. Then it was said among the nations, 'The Lord has done great things for them.'",
    "Philippians 4:4 - Rejoice in the Lord always. I will say it again: Rejoice!",
    "Psalm 118:24 - This is the day that the Lord has made; let us rejoice and be glad in it.",
  ],
  sad: [
    "Psalm 34:18 - The Lord is near to the brokenhearted and saves the crushed in spirit.",
    "Revelation 21:4 - He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.",
    "Matthew 5:4 - Blessed are those who mourn, for they shall be comforted.",
    "Psalm 147:3 - He heals the brokenhearted and binds up their wounds.",
  ],
  anxious: [
    "Philippians 4:6-7 - Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    "1 Peter 5:7 - Cast all your anxiety on him because he cares for you.",
    "Matthew 6:34 - Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.",
    "Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
  ],
};

const CanvasPage = ({ match }) => {
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const textInputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [bibleVerses, setBibleVerses] = useState([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [rectColor, setRectColor] = useState("#ff0000");

  useEffect(() => {
    const storedEmotion = sessionStorage.getItem("emotions");
    const emotion = storedEmotion
      ? storedEmotion.toLowerCase()
      : prompt("How are you feeling today? (happy, sad, anxious)");

    if (emotion && emotions[emotion]) {
      sessionStorage.setItem("emotions", emotion);
      setBibleVerses(emotions[emotion]);
      setCurrentVerseIndex(0);
    }

    const fetchItems = () => {
      const itemsData = JSON.parse(sessionStorage.getItem("canvasItems")) || [];
      setItems(itemsData);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const stage = stageRef.current;
      const scaleBy = 1.02;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      setStagePos(newPos);
      stage.position(newPos);
      stage.batchDraw();
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = (e, id) => {
    setDragging(false);

    if (id) {
      const newPos = { x: e.target.x(), y: e.target.y() };

      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, x: newPos.x, y: newPos.y } : item
      );
      setItems(updatedItems);
      sessionStorage.setItem("canvasItems", JSON.stringify(updatedItems));
    }
  };

  const handleAddRect = () => {
    if (stageRef.current) {
      const newItem = {
        id: uuidv4(),
        type: "rect",
        x: stageRef.current.width() / 2,
        y: stageRef.current.height() / 2,
        width: 100,
        height: 100,
        fill: rectColor,
        draggable: true,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      sessionStorage.setItem("canvasItems", JSON.stringify(updatedItems));
    }
  };

  const handleAddText = () => {
    if (stageRef.current) {
      const newItem = {
        id: uuidv4(),
        type: "text",
        x: stageRef.current.width() / 2,
        y: stageRef.current.height() / 2,
        text: "New Text",
        fontSize: 20,
        draggable: true,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      sessionStorage.setItem("canvasItems", JSON.stringify(updatedItems));
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    const selectedNode = stageRef.current.findOne(`#${id}`);
    if (selectedNode && selectedNode.getClassName() === "Text") {
      const textPosition = selectedNode.getClientRect();
      const areaPosition = {
        top: textPosition.y,
        left: textPosition.x,
      };
      const textarea = textInputRef.current;
      textarea.style.top = `${areaPosition.top}px`;
      textarea.style.left = `${areaPosition.left}px`;
      textarea.style.width = `${selectedNode.width()}px`;
      textarea.style.height = `${selectedNode.height()}px`;
      textarea.style.display = "block";
      textarea.value = selectedNode.text();
      textarea.focus();
    }
  };

  const handleTextareaChange = (e) => {
    const updatedItems = items.map((item) =>
      item.id === selectedId ? { ...item, text: e.target.value } : item
    );
    setItems(updatedItems);
    sessionStorage.setItem("canvasItems", JSON.stringify(updatedItems));
  };

  const handleTextareaBlur = () => {
    textInputRef.current.style.display = "none";
    setSelectedId(null);
  };

  const handleColorChange = (color) => {
    setRectColor(color.hex);
  };

  const handleRemoveVerse = () => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove the verse?"
    );
    if (confirmRemove) {
      setBibleVerses([]);
    }
  };

  useEffect(() => {
    if (selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  return (
    <>
      <Header />
      <div className="canvas-page">
        <SketchPicker color={rectColor} onChangeComplete={handleColorChange} />
        <div className="canvas-buttons">
          <button onClick={handleAddRect}>Add Rectangle</button>
          <button onClick={handleAddText}>Add Text</button>
          <button onClick={handleRemoveVerse}>Remove Verse</button>
        </div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          draggable={false}
          ref={stageRef}
          x={stagePos.x}
          y={stagePos.y}
          className={dragging ? "stage dragging" : "stage"}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              fillPatternScale={{ x: 1, y: 1 }}
            />
            <Text
              text="Drag and scroll to explore the infinite canvas!"
              fontSize={15}
              x={10}
              y={10}
              className="text"
            />
            {bibleVerses.length > 0 && (
              <Text
                text={bibleVerses[currentVerseIndex]}
                fontSize={20}
                x={10}
                y={40}
                className="bible-verse"
              />
            )}
            {items.map((item, i) =>
              item.type === "rect" ? (
                <Rect
                  key={i}
                  id={item.id}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  fill={item.fill}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={(e) => handleDragEnd(e, item.id)}
                  onClick={() => handleSelect(item.id)}
                />
              ) : item.type === "text" ? (
                <Text
                  key={i}
                  id={item.id}
                  x={item.x}
                  y={item.y}
                  text={item.text}
                  fontSize={item.fontSize}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={(e) => handleDragEnd(e, item.id)}
                  onClick={() => handleSelect(item.id)}
                />
              ) : null
            )}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
        <textarea
          ref={textInputRef}
          className="textarea"
          onChange={handleTextareaChange}
          onBlur={handleTextareaBlur}
        />
      </div>
    </>
  );
};

export default CanvasPage;
