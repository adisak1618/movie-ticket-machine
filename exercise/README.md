# Challenge : Movie Ticket Machine
แบบทดสอบสร้างระบบซื้อตั๋วหนังผ่านตู้ขายตั๋วอัตโนมัติ
https://movieticketcnx.herokuapp.com/

## Install
1.  Clone repo นี้
2. ```cd exercise```
3. ```yarn``` or ```npm install```
4. start mongodb server ```mongod```
5. add .env file ตัวอย่างใน .env.example
6. run seeding ```yarn run seed```
7. ```yarn run dev```
8. ```yarn run test``` *** for testing e2e please run ```yarn run dev``` first


### Technology
   - Next.js ง่ายตัวช่วยเยอะ config อะไรให้หมดอย่างที่รู้ๆกัน
   - CSS ใช้ styled-components ง่ายดีสะดวกกว่าตัวอื่น สามารถยัด logic ลงไปได้ใน component
   - MongdoDB เพราะกำหนดให้ใช้ nosql แล้ว mongodb ก็น่าจะโอเคสะดวกสุดแล้ว ปกติใช้แต่ postgress เคยเป็น big fan ของ mongodb ตอนเรียนมหาลัยเพราะมันใช้ง่ายดี แต่พอต้องทำเว็บหรือapi ที่ต้องการความถูกต้องเลยหันมาใช้ postgress ยาวเลยครับ
   - TEST บอกตามตรงปกติผมไม่ค่อยได้เขียน test เคยเขียนแค่ใน rails เพราะโปรเจคตอนนั้นระยะยาว แต่ในนี้ผมเลือกใช้ enzyme, jest ง่ายดีแต่ยังไม่ค่อยชินกับคำสั่งเท่าไหร่
### Architecture Design
  node + mongodb + next.js + restfull-api ตรงนี้ไม่ได้ซับซ้อนอะไร เพราะใช้ next.js restfull-api ก็ใช้ node.js เขียนยุแล้วเลยรวบ font-end/back-end ไว้ใน server เดียวกันเลย ทำให้ deploy ง่ายด้วย
### Deployment
  - ใช้ heroku ครับเพราะฟรีแล้วก็ง่าย add-on เยอะ ปกติถ้าโปรเจคส่วนตัวลองเขียนเล่นๆผมก็ใช้ heroku หมด เช่นพวก chatbot หรือเว็บอะไรง่ายๆไม่มี load มาก โปรเจคอื่นๆส่วนตัวเคยใช้ heroku, AWS, digital ประมาณนี้ครับ
  - deploy heroku ผมว่าคนตรวจคงทราบดีครับ แต่ปัญหาเล็กๆน้อยๆที่ผมเจอคือ project stucture นี้ code มันจะอยู่ใน folder exercise เลยต้องใช้คำสั่งนี้ในการ deploy แทนคำสั่งปกติ ```git subtree push --prefix exercise heroku master```
  
