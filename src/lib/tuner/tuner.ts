// Based on the Tuner class from https://github.com/qiuxiang/tuner
// Copyright (c) 2022 Qiu Xiang <xiang.qiu@qq.com>
// Licensed under the MIT License

import aubio from "aubiojs";

export interface DetectedNote {
  name: string;
  value: number;
  cents: number;
  octave: number;
  frequency: number;
}

export class Tuner {
  private middleA: number;
  private semitone: number;
  private bufferSize: number;
  private noteStrings: string[];
  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private scriptProcessor!: ScriptProcessorNode;
  private pitchDetector: any;
  public onNoteDetected?: (note: DetectedNote) => void;

  constructor(a4: number = 440) {
    this.middleA = a4;
    this.semitone = 69;
    this.bufferSize = 4096;
    this.noteStrings = [
      "C",
      "C♯",
      "D",
      "D♯",
      "E",
      "F",
      "F♯",
      "G",
      "G♯",
      "A",
      "A♯",
      "B",
    ];
    this.initGetUserMedia();
  }

  private initGetUserMedia() {
    window.AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;

    if (!window.AudioContext) {
      alert("AudioContext not supported");
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("getUserMedia is not supported in this browser");
      return;
    }
  }

  public init() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.scriptProcessor = this.audioContext.createScriptProcessor(
      this.bufferSize,
      1,
      1
    );

    aubio().then((aubio: any) => {
      this.pitchDetector = new aubio.Pitch(
        "default",
        this.bufferSize,
        1,
        this.audioContext.sampleRate
      );
      this.startRecord();
    });
  }

  private startRecord() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.audioContext
          .createMediaStreamSource(stream)
          .connect(this.analyser);
        this.analyser.connect(this.scriptProcessor);
        this.scriptProcessor.connect(this.audioContext.destination);
        this.scriptProcessor.addEventListener(
          "audioprocess",
          (event: AudioProcessingEvent) => {
            const frequency = this.pitchDetector.do(
              event.inputBuffer.getChannelData(0)
            );
            if (frequency && this.onNoteDetected) {
              const note = this.getNote(frequency);
              this.onNoteDetected({
                name: this.noteStrings[note % 12],
                value: note,
                cents: this.getCents(frequency, note),
                octave: Math.floor(note / 12) - 1,
                frequency: frequency,
              });
            }
          }
        );
      })
      .catch((error) => {
        alert(error.name + ": " + error.message);
      });
  }

  private getNote(frequency: number): number {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  private getStandardFrequency(note: number): number {
    return this.middleA * Math.pow(2, (note - this.semitone) / 12);
  }

  private getCents(frequency: number, note: number): number {
    return Math.floor(
      (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
        Math.log(2)
    );
  }
}
