import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'emoji-panel',
  templateUrl: 'emoji-panel.html',
})

export class EmojiPanelComponent implements OnInit {
  constructor() {}
  @Input() result: {} = {};
  @Input() showEmojis: boolean = false;
  @Output() onEmojiSelect: EventEmitter<string> = new EventEmitter();

  emojiList = {
    positive: [128512, 128513, 128536, 128516],
    neutral: [128528, 128529, 128566, 129300],
    negative: [128543, 128577, 128546, 128542],
  };

  codePoint(emojiCodePoint) {
    return String.fromCodePoint(emojiCodePoint);
  }

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    this.onEmojiSelect.emit(emoji);
  }

  ngOnInit() {}
}
