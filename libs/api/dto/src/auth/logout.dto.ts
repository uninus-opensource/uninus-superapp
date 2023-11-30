import { ApiProperty } from "@nestjs/swagger";

export class LogoutDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJI3343zI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi3213OiIwYzRmY2JhOC0zODEwLTQxYzUtOGE4MC05OWQwMTE0MTFhNjMiLCJlbWFpbCI6InN1Z2lhcnRvZmFobWlAZ21haWwuY29tIiwicm9sZSI6Ik5ldyBTdHVkZW50IiwiaWF032321IjoxNjkzMTQ1NzE3LCJleHAiOjE2OTM3NTA1MTd9.26FX9KbvIq2-TydQV-q2311",
  })
  public refresh_token!: string;
}
