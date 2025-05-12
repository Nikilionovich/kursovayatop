class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    this.prev = null;
    }
  }
  class DoubleLinkedList {
    constructor(value){
  this.head= new Node(value);
  this.tail=this.head;
  this.length=1;
    }
    append(value){
       const newNode=new Node(value)
       newNode.prev=this.tail;
       this.tail.next=newNode;
       this.tail=newNode;
       this.length++;
       return this;
    }
    preppend(value){
        const newNode=new Node(value)
        this.head.prev=newNode;
        newNode.next=this.head;
        this.head=newNode;
        this.length++;
        return this;
    }
  }
  class Todo {
    constructor(tasks) {
      this.tasks = tasks || [];
    }
  }